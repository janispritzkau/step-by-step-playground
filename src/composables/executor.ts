import { useEventListener } from "@vueuse/core";
import { onMounted, onUnmounted, ref } from "vue";

export function useExecutor<T, TReturn>(executor: () => Generator<T, TReturn>) {
  let generator = executor();

  const step = ref(-1);
  const done = ref(false);

  const next = () => {
    if (done.value) return;
    const result = generator.next();
    step.value++;
    if (result.done) done.value = true;
  };

  const reset = (to?: number) => {
    skip();
    generator = executor();
    step.value = -1;
    done.value = false;
    if (to != null) jump(to);
    else next();
  };

  const skip = () => {
    while (!done.value) {
      next();
    }
  };

  const jump = (to: number) => {
    if (to < step.value) {
      skip();
      reset();
    }
    while (!done.value && step.value < to) {
      next();
    }
  };

  const prev = () => {
    if (step.value == 0) return;
    jump(step.value - 1);
  };

  useEventListener("keydown", (event) => {
    switch (event.code) {
      case "Space":
        if (event.shiftKey) prev();
        else next();
        break;
      case "Enter":
        if (done.value) reset();
        else skip();
        break;
      case "ArrowLeft":
        prev();
        break;
      case "ArrowRight":
        next();
        break;
      default:
        return;
    }
    event.preventDefault();
  });

  onMounted(() => {
    next();
  });

  onUnmounted(() => {
    skip();
  });

  return { step, done, next, reset, skip, jump, prev };
}
