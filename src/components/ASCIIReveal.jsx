import React, { useEffect, useRef, useState, useCallback, useMemo, startTransition } from "react";

export default function ASCIIReveal(props) {
  const {
    image = { src: "/events/Technovista2025/tv25-icons/landing-page-text.svg", alt: "Sample image" },
    method = "threshold",
    threshold = 128,
    invert = false,
    columns = 35,
    trigger = "click",
    backgroundColor = "transparent",
    textColor = "#ffffff",
    asciiChars = ".+-",
    fontSize = 14,
    cellAppearMs = 3,
    scrambleCount = 5,
    scrambleSpeedMs = 80,
    revealDelayMs = 100,
    showControls = false
  } = props;

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const wrapperRef = useRef(null);
  const animTimeoutRef = useRef(null);
  const scrambleIntervalRef = useRef(null);
  const rafRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const isStatic = false;

  const stopAnimation = useCallback(() => {
    if (animTimeoutRef.current !== null) {
      clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = null;
    }
    if (scrambleIntervalRef.current !== null) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    stopAnimation();
    startTransition(() => {
      setImgLoaded(false);
      setIsRevealed(false);
      setIsPlaying(false);
      setHasPlayedOnce(false);
    });
    if (typeof window === "undefined") return;
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      startTransition(() => setImgLoaded(true));
    }
  }, [image?.src, stopAnimation]);

  const asciiLayout = useMemo(() => {
    let currentAR = 16 / 9; // Default wide aspect ratio
    if (imgRef.current && imgRef.current.naturalWidth > 0) {
      currentAR = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
    }

    if (typeof document === "undefined") {
      const charWidth = 8 * 2.0; // Spaced out
      const charHeight = fontSize * 1.5; // Spaced out
      const ASCII_COLUMNS = columns;
      const ASCII_ROWS = Math.round(ASCII_COLUMNS * (1 / currentAR) * (charWidth / charHeight));
      return { charWidth, charHeight, rows: ASCII_ROWS, dispW: ASCII_COLUMNS * charWidth, dispH: ASCII_ROWS * charHeight };
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const charHeight = fontSize * 1.2; // Spaced out line height
    let charWidth = 8 * 1.5; // Spaced out default width
    if (ctx) {
      ctx.font = `${fontSize}px monospace`;
      charWidth = Math.ceil(ctx.measureText("M").width) * 1.5; // Spaced out letter width
    }
    const ASCII_COLUMNS = columns;
    const ASCII_ROWS = Math.round(ASCII_COLUMNS * (1 / currentAR) * (charWidth / charHeight));
    return { charWidth, charHeight, rows: ASCII_ROWS, dispW: ASCII_COLUMNS * charWidth, dispH: ASCII_ROWS * charHeight };
  }, [columns, fontSize, imgLoaded]);

  const getCharDimensions = useCallback(() => {
    return { width: asciiLayout.charWidth, height: asciiLayout.charHeight };
  }, [asciiLayout.charWidth, asciiLayout.charHeight]);

  const getLuma = useCallback((r, g, b) => {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }, []);

  const toBW = useCallback((pixels, W, H, thresh, inv) => {
    const out = new Uint8Array(W * H);
    for (let i = 0; i < pixels.length; i += 4) {
      const l = getLuma(pixels[i], pixels[i + 1], pixels[i + 2]);
      let v = l >= thresh ? 255 : 0;
      if (inv) v = 255 - v;
      out[i / 4] = v;
    }
    return out;
  }, [getLuma]);

  const toDither = useCallback((pixels, W, H, thresh, inv) => {
    const buf = new Float32Array(W * H);
    for (let i = 0; i < pixels.length; i += 4) {
      buf[i / 4] = getLuma(pixels[i], pixels[i + 1], pixels[i + 2]);
    }
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = y * W + x;
        const old = buf[idx];
        const nw = old < thresh ? 0 : 255;
        buf[idx] = nw;
        const e = old - nw;
        if (x + 1 < W) buf[idx + 1] += (e * 7) / 16;
        if (y + 1 < H) {
          if (x - 1 >= 0) buf[idx + W - 1] += (e * 3) / 16;
          buf[idx + W] += (e * 5) / 16;
          if (x + 1 < W) buf[idx + W + 1] += (e * 1) / 16;
        }
      }
    }
    const out = new Uint8Array(W * H);
    for (let i = 0; i < buf.length; i++) {
      let v = buf[i] >= 128 ? 255 : 0;
      if (inv) v = 255 - v;
      out[i] = v;
    }
    return out;
  }, [getLuma]);

  const shuffleArray = useCallback((array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const drawCharacter = useCallback((ctx, col, row, char, cw, ch, bgCol, fgCol) => {
    ctx.fillStyle = bgCol;
    ctx.fillRect(col * cw, row * ch, cw, ch);
    ctx.fillStyle = fgCol;
    ctx.fillText(char, col * cw, row * ch);
  }, []);

  const startEffect = useCallback(() => {
    if (!imgRef.current || !canvasRef.current || !imgLoaded) return;
    stopAnimation();
    startTransition(() => {
      setIsRevealed(false);
      setIsPlaying(true);
      setHasPlayedOnce(true);
    });
    const srcImg = imgRef.current;
    const cv = canvasRef.current;
    const { width: charWidth, height: charHeight } = getCharDimensions();
    const ASCII_COLUMNS = columns;
    const ASCII_ROWS = asciiLayout.rows;
    const dpr = 2;
    const dispW = asciiLayout.dispW;
    const dispH = asciiLayout.dispH;
    cv.width = dispW * dpr;
    cv.height = dispH * dpr;
    cv.style.width = "100%";
    cv.style.height = "100%";
    if (wrapperRef.current) {
      wrapperRef.current.style.width = dispW + "px";
      wrapperRef.current.style.height = dispH + "px";
    }
    const BG = invert ? "#f0ece0" : backgroundColor;
    const FG = invert ? "#111111" : textColor;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, dispW, dispH); // Use clearRect for transparent bg
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, dispW, dispH);
    }
    ctx.font = `${charHeight}px monospace`;
    ctx.textBaseline = "top";
    const imgAR = srcImg.naturalWidth / srcImg.naturalHeight;
    const tgtAR = asciiLayout.dispW / asciiLayout.dispH;
    let cx = 0, cy = 0, cw = srcImg.naturalWidth, ch = srcImg.naturalHeight;

    // Contain instead of Cover logic to prevent horizontal/vertical clipping
    if (imgAR > tgtAR) {
      // Image is wider than target aspect ratio, fit to width
      ch = cw / tgtAR;
      cy = (srcImg.naturalHeight - ch) / 2;
    } else {
      // Image is taller than target aspect ratio, fit to height
      cw = ch * tgtAR;
      cx = (srcImg.naturalWidth - cw) / 2;
    }
    const sc = document.createElement("canvas");
    sc.width = ASCII_COLUMNS;
    sc.height = ASCII_ROWS;
    const sctx = sc.getContext("2d");
    if (!sctx) return;
    sctx.drawImage(srcImg, cx, cy, cw, ch, 0, 0, ASCII_COLUMNS, ASCII_ROWS);
    const rawPx = sctx.getImageData(0, 0, ASCII_COLUMNS, ASCII_ROWS).data;
    const bwPx = method === "dither" ? toDither(rawPx, ASCII_COLUMNS, ASCII_ROWS, threshold, invert) : toBW(rawPx, ASCII_COLUMNS, ASCII_ROWS, threshold, invert);
    const LEN = asciiChars.length - 1;
    const asciiGrid = [];
    const brightnessGrid = [];
    for (let row = 0; row < ASCII_ROWS; row++) {
      const aRow = [];
      const bRow = [];
      for (let col = 0; col < ASCII_COLUMNS; col++) {
        const v = bwPx[row * ASCII_COLUMNS + col];
        const idx = Math.min(LEN, Math.floor((1 - v / 255) * asciiChars.length));
        aRow.push(asciiChars[idx]);
        bRow.push(idx);
      }
      asciiGrid.push(aRow);
      brightnessGrid.push(bRow);
    }
    const totalCells = ASCII_COLUMNS * ASCII_ROWS;
    const scrambleState = new Array(totalCells).fill(null);
    let settledCount = 0;
    let done = false;
    const denseCharIndex = asciiChars.lastIndexOf(".");
    const denseChars = asciiChars.slice(denseCharIndex + 1).split("");
    function scheduleReveal() {
      if (done) return;
      done = true;
      animTimeoutRef.current = window.setTimeout(() => {
        startTransition(() => {
          setIsRevealed(true);
          setIsPlaying(false);
        });
      }, revealDelayMs);
    }
    const cellOrder = shuffleArray(Array.from({ length: totalCells }, (_, i) => i));
    const startTime = performance.now();
    const cellRevealTimes = cellOrder.map((_, i) => i * cellAppearMs);
    const revealedCells = new Set();
    function animateFrame(currentTime) {
      if (done) return;
      const elapsed = currentTime - startTime;
      cellOrder.forEach((cellIndex, i) => {
        if (revealedCells.has(cellIndex)) return;
        if (elapsed < cellRevealTimes[i]) return;
        revealedCells.add(cellIndex);
        const row = Math.floor(cellIndex / ASCII_COLUMNS);
        const col = cellIndex % ASCII_COLUMNS;
        const isDark = brightnessGrid[row][col] > denseCharIndex;
        if (!isDark) {
          drawCharacter(ctx, col, row, asciiGrid[row][col], charWidth, charHeight, BG === 'transparent' ? 'rgba(0,0,0,0)' : BG, FG);
          scrambleState[cellIndex] = 0;
          settledCount++;
          if (settledCount === totalCells) scheduleReveal();
        } else {
          drawCharacter(ctx, col, row, denseChars[Math.floor(Math.random() * denseChars.length)], charWidth, charHeight, BG === 'transparent' ? 'rgba(0,0,0,0)' : BG, FG);
          scrambleState[cellIndex] = scrambleCount;
        }
      });
      if (revealedCells.size < totalCells) {
        rafRef.current = requestAnimationFrame(animateFrame);
      }
    }
    rafRef.current = requestAnimationFrame(animateFrame);
    scrambleIntervalRef.current = window.setInterval(() => {
      if (done) {
        if (scrambleIntervalRef.current !== null) {
          clearInterval(scrambleIntervalRef.current);
        }
        return;
      }
      let stillScrambling = false;
      for (let ci = 0; ci < totalCells; ci++) {
        const remaining = scrambleState[ci];
        if (remaining === null || remaining === 0) continue;
        stillScrambling = true;
        const row = Math.floor(ci / ASCII_COLUMNS);
        const col = ci % ASCII_COLUMNS;
        if (remaining === 1) {
          drawCharacter(ctx, col, row, asciiGrid[row][col], charWidth, charHeight, BG === 'transparent' ? 'rgba(0,0,0,0)' : BG, FG);
          scrambleState[ci] = 0;
          settledCount++;
          if (settledCount === totalCells) {
            if (scrambleIntervalRef.current !== null) {
              clearInterval(scrambleIntervalRef.current);
            }
            scheduleReveal();
            return;
          }
        } else {
          drawCharacter(ctx, col, row, denseChars[Math.floor(Math.random() * denseChars.length)], charWidth, charHeight, BG === 'transparent' ? 'rgba(0,0,0,0)' : BG, FG);
          scrambleState[ci] = remaining - 1;
        }
      }
      if (!stillScrambling && settledCount === totalCells) {
        if (scrambleIntervalRef.current !== null) {
          clearInterval(scrambleIntervalRef.current);
        }
        scheduleReveal();
      }
    }, scrambleSpeedMs);
  }, [imgLoaded, columns, method, threshold, invert, backgroundColor, textColor, asciiChars, fontSize, cellAppearMs, scrambleCount, scrambleSpeedMs, revealDelayMs, getCharDimensions, toBW, toDither, shuffleArray, drawCharacter, stopAnimation, asciiLayout.rows, asciiLayout.dispW, asciiLayout.dispH]);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  useEffect(() => {
    if (imgLoaded && trigger === "auto" && !hasPlayedOnce) {
      startEffect();
    }
  }, [imgLoaded, trigger, startEffect, hasPlayedOnce]);

  const handleImageLoad = useCallback(() => {
    startTransition(() => setImgLoaded(true));
  }, []);

  const handleImageError = useCallback(() => {
    startTransition(() => setImgLoaded(false));
  }, []);

  const handleReplay = useCallback(() => {
    startEffect();
  }, [startEffect]);

  const handleClick = useCallback(() => {
    if (trigger === "click" && !isPlaying) {
      startEffect();
    }
  }, [trigger, isPlaying, startEffect]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === "hover" && !isPlaying) {
      startEffect();
    }
  }, [trigger, isPlaying, startEffect]);

  if (isStatic) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: backgroundColor, padding: 20, overflow: "hidden" }}>
        <img src={image.src} alt={image.alt || "ASCII Reveal Preview"} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: backgroundColor, overflow: "hidden" }}>
      <div ref={wrapperRef} style={{ position: "relative", width: "100%", height: "auto", maxWidth: "100%", aspectRatio: `${asciiLayout.dispW} / ${asciiLayout.dispH}`, display: imgLoaded ? "block" : "none", cursor: trigger === "click" ? "pointer" : "default" }} onClick={handleClick} onMouseEnter={handleMouseEnter}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", borderRadius: 8, opacity: isRevealed ? 0 : 1, transition: "opacity 0.7s ease" }} />
        <img ref={imgRef} src={image.src} alt={image.alt || ""} crossOrigin="anonymous" onLoad={handleImageLoad} onError={handleImageError} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: isRevealed ? 1 : 0, transition: "opacity 0.9s ease", borderRadius: 8, pointerEvents: "none", zIndex: 2 }} />
      </div>
      {showControls && imgLoaded && <button onClick={handleReplay} style={{ fontSize: 12, padding: "8px 20px", borderRadius: 6, border: "1px solid #333", background: "#ddd", color: "#111", cursor: "pointer", fontFamily: "inherit", marginTop: "16px" }}>↺ Replay</button>}
    </div>
  );
}
