(function() {
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const originalToBlob = HTMLCanvasElement.prototype.toBlob;
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

    // Fixed noise values per session so the fingerprint is stable for the session,
    // avoiding being flagged as a bot by changing fingerprint every millisecond.
    const sessionNoiseR = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const sessionNoiseG = Math.floor(Math.random() * 5) - 2; 
    const sessionNoiseB = Math.floor(Math.random() * 5) - 2; 

    function applyNoiseToCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return canvas;
        const width = canvas.width;
        const height = canvas.height;
        if (width === 0 || height === 0) return canvas;

        const cloneCanvas = document.createElement('canvas');
        cloneCanvas.width = width;
        cloneCanvas.height = height;
        const cloneCtx = cloneCanvas.getContext('2d');
        cloneCtx.drawImage(canvas, 0, 0);
        
        // Use original getImageData to avoid recursion
        const imageData = originalGetImageData.call(cloneCtx, 0, 0, width, height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] > 0) { // Only modify non-transparent pixels
                imageData.data[i] = Math.min(255, Math.max(0, imageData.data[i] + sessionNoiseR));
                imageData.data[i+1] = Math.min(255, Math.max(0, imageData.data[i+1] + sessionNoiseG));
                imageData.data[i+2] = Math.min(255, Math.max(0, imageData.data[i+2] + sessionNoiseB));
            }
        }
        cloneCtx.putImageData(imageData, 0, 0);
        return cloneCanvas;
    }

    HTMLCanvasElement.prototype.toDataURL = function() {
        const clonedCanvas = applyNoiseToCanvas(this);
        return originalToDataURL.apply(clonedCanvas, arguments);
    };

    HTMLCanvasElement.prototype.toBlob = function() {
        const clonedCanvas = applyNoiseToCanvas(this);
        return originalToBlob.apply(clonedCanvas, arguments);
    };

    CanvasRenderingContext2D.prototype.getImageData = function(x, y, width, height) {
        const imageData = originalGetImageData.apply(this, arguments);
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] > 0) {
                imageData.data[i] = Math.min(255, Math.max(0, imageData.data[i] + sessionNoiseR));
                imageData.data[i+1] = Math.min(255, Math.max(0, imageData.data[i+1] + sessionNoiseG));
                imageData.data[i+2] = Math.min(255, Math.max(0, imageData.data[i+2] + sessionNoiseB));
            }
        }
        return imageData;
    };
})();
