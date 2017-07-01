export const easeMotion = (isActive, peak, incRate, currRate) => {
    if (isActive) {
        if (currRate < peak) {
            currRate += incRate;
        } else {
            currRate = 0.5;
        }
    } else if (!isActive) {
        if (currRate > 0) {
            currRate -= incRate;
        } else {
            currRate = 0;
        }
    }
    return currRate
};
