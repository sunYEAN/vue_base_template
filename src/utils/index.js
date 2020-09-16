export function preload (images) {
    let load = (src) => {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.src = src;
            image.onload = function () {
                resolve();
            };
            image.error = reject;
        })
    };
    const loads = images.map(src => load(src));
    return Promise.all(loads);
}
