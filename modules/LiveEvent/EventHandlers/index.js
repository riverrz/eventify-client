import { TIMER_OVER } from "modules/LiveEvent/redux/constants";

export const handleTimerSync = (emit, data) => {
  emit(data);
};
export const handleTimerOver = (emit) => {
  emit(TIMER_OVER);
};
