const keys = {
    forward: "x",
    back: "z",
    left: ",",
    right: ".",
    fire: "c"
};

const speeds = {
    walking: 10,
    turning: Math.PI * 0.06
};

const isKey = (keyList, key) =>  keyList.indexOf(key) > -1;

export const isFiring = (keyList) => {
    return isKey(keyList, keys.fire);
};

export const isMove = {
    forward: (keysPressed) => (isKey(keysPressed, keys.forward)),
    back: (keysPressed) => (isKey(keysPressed, keys.back)),
    left: (keysPressed) => (isKey(keysPressed, keys.left)),
    right: (keysPressed) => (isKey(keysPressed, keys.right))
};

export const cameraPositionX = (keysPressed, cameraRotationY) => {
    return isMove.forward(keysPressed)
            ?   Math.sin(cameraRotationY) * speeds.walking
            :   isMove.back(keysPressed)
                ?   -Math.sin(cameraRotationY) * speeds.walking
                :   0
};

export const cameraPositionZ = (keysPressed, cameraRotationY) => {
    return isMove.forward(keysPressed)
            ?   Math.cos(cameraRotationY) * speeds.walking
            :   isMove.back(keysPressed)
                ?   -Math.cos(cameraRotationY) * speeds.walking
                :   0
};

export const cameraRotationY = (keysPressed) => {
    return isMove.left(keysPressed)
                ?   speeds.turning
                :   isMove.right(keysPressed)
                        ?   -speeds.turning
                        :   0
};

export const animateKey = (key, keysPressed, fraction) => {
    return isKey(keysPressed, key)  ? fraction : 0
};