import { Pane } from "https://cdn.skypack.dev/tweakpane@4.0.4";
window.Pane = Pane;

// Register GSAP plugins
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
// Project titles
const items = [
  "Digital Bug",
  "Bash Shell",
  "Delusion",
  "Mindset",
  "Veil",
  "Linux",
  "The Linux News"
];
// Image URLs - replace with your actual image URLs
const imageUrls = [
  "./assets/bug.jpg",
  "./assets/bash.jpg",
  "./assets/delusion.png",
  "./assets/mindset.png",
  "./assets/veil.jpg",
  "./assets/linux.jpg",
  "./assets/news.png"
];
const container = document.querySelector(".container");
const canvas = document.getElementById("canvas");
const overlay = document.getElementById("overlay");
const projectTitleElement = document.querySelector(".project-title p");
// Settings object for Tweakpane
const settings = {
  // Item sizes
  baseWidth: 300,
  smallHeight: 400,
  largeHeight: 375,
  itemGap: 65,
  hoverScale: 1.05,
  expandedScale: 0.4, // Percentage of viewport width
  dragEase: 0.075,
  momentumFactor: 200,
  bufferZone: 3,
  borderRadius: 0,
  vignetteSize: 0,
  // Page vignette settings - simplified to two main controls
  vignetteStrength: 0.7, // Controls opacity of all layers
  vignetteSize: 200, // Controls size of all layers
  // Overlay settings
  overlayOpacity: 0.9,
  overlayEaseDuration: 0.8,
  // Animation durations
  zoomDuration: 0.6 // Reduced from 1.0 to 0.6 for faster zoom
};
// Define item sizes based on settings
let itemSizes = [
  {
    width: settings.baseWidth,
    height: settings.smallHeight
  },
  {
    width: settings.baseWidth,
    height: settings.largeHeight
  }
];
let itemGap = settings.itemGap;
let columns = 4;
const itemCount = items.length;
// Calculate grid cell size based on the largest possible item
let cellWidth = settings.baseWidth + settings.itemGap;
let cellHeight =
  Math.max(settings.smallHeight, settings.largeHeight) + settings.itemGap;
let isDragging = false;
let startX, startY;
let targetX = 0,
  targetY = 0;
let currentX = 0,
  currentY = 0;
let dragVelocityX = 0,
  dragVelocityY = 0;
let lastDragTime = 0;
let mouseHasMoved = false;
let visibleItems = new Set();
let lastUpdateTime = 0;
let lastX = 0,
  lastY = 0;
let isExpanded = false;
let activeItem = null;
let activeItemId = null;
let canDrag = true;
let originalPosition = null;
let expandedItem = null;
let overlayAnimation = null;
let titleSplit = null;
let activeCaptionNameSplit = null;
let activeCaptionNumberSplit = null;
let paneInstance = null;
// Initialize Tweakpane
function initTweakpane() {
  // Wait for Pane to be available (imported via ES module)
  if (!window.Pane) {
    setTimeout(initTweakpane, 100);
    return;
  }
  // Create the pane with a title and make it visible even when collapsed
  paneInstance = new window.Pane({
    title: "Gallery Settings",
    expanded: false
  });
  // Make sure the pane is visible by styling its container
  const paneElement = paneInstance.element;
  paneElement.style.position = "fixed";
  paneElement.style.top = "10px";
  paneElement.style.right = "10px";
  paneElement.style.zIndex = "10000";
  // Item size settings
  const sizeFolder = paneInstance.addFolder({
    title: "Item Sizes",
    expanded: false
  });
  sizeFolder
    .addBinding(settings, "baseWidth", {
      min: 100,
      max: 600,
      step: 10
    })
    .on("change", updateSettings);
  sizeFolder
    .addBinding(settings, "smallHeight", {
      min: 100,
      max: 400,
      step: 10
    })
    .on("change", updateSettings);
  sizeFolder
    .addBinding(settings, "largeHeight", {
      min: 100,
      max: 600,
      step: 10
    })
    .on("change", updateSettings);
  // Layout settings
  const layoutFolder = paneInstance.addFolder({
    title: "Layout",
    expanded: false
  });
  layoutFolder
    .addBinding(settings, "itemGap", {
      min: 0,
      max: 100,
      step: 5
    })
    .on("change", updateSettings);
  layoutFolder
    .addBinding(settings, "bufferZone", {
      min: 1,
      max: 5,
      step: 0.5
    })
    .on("change", updateSettings);
  // Style settings
  const styleFolder = paneInstance.addFolder({
    title: "Style",
    expanded: false
  });
  styleFolder
    .addBinding(settings, "borderRadius", {
      min: 0,
      max: 16,
      step: 1
    })
    .on("change", updateBorderRadius);
  // Item vignette settings
  const itemVignetteFolder = paneInstance.addFolder({
    title: "Item Vignette",
    expanded: false
  });
  itemVignetteFolder
    .addBinding(settings, "vignetteSize", {
      min: 0,
      max: 50,
      step: 1
    })
    .on("change", updateVignetteSize);
  // Page vignette settings - simplified to two controls
  const pageVignetteFolder = paneInstance.addFolder({
    title: "Page Vignette",
    expanded: false
  });
  pageVignetteFolder
    .addBinding(settings, "vignetteStrength", {
      min: 0,
      max: 1,
      step: 0.05
    })
    .on("change", updatePageVignette);
  pageVignetteFolder
    .addBinding(settings, "vignetteSize", {
      min: 0,
      max: 500,
      step: 10
    })
    .on("change", updatePageVignette);
  // Overlay settings
  const overlayFolder = paneInstance.addFolder({
    title: "Overlay Animation",
    expanded: false
  });
  overlayFolder.addBinding(settings, "overlayOpacity", {
    min: 0,
    max: 1,
    step: 0.05
  });
  overlayFolder.addBinding(settings, "overlayEaseDuration", {
    min: 0.2,
    max: 2,
    step: 0.1
  });
  // Animation settings
  const animationFolder = paneInstance.addFolder({
    title: "Animation",
    expanded: false
  });
  animationFolder
    .addBinding(settings, "hoverScale", {
      min: 1,
      max: 1.5,
      step: 0.05
    })
    .on("change", updateHoverScale);
  animationFolder.addBinding(settings, "expandedScale", {
    min: 0.2,
    max: 0.8,
    step: 0.05
  });
  animationFolder.addBinding(settings, "dragEase", {
    min: 0.01,
    max: 0.2,
    step: 0.01
  });
  animationFolder.addBinding(settings, "momentumFactor", {
    min: 50,
    max: 500,
    step: 10
  });
  animationFolder.addBinding(settings, "zoomDuration", {
    min: 0.2,
    max: 1.5,
    step: 0.1
  });
  // Add a button to reset the view
  paneInstance
    .addButton({
      title: "Reset View"
    })
    .on("click", () => {
      targetX = 0;
      targetY = 0;
    });
  // Add keyboard shortcut for toggling the panel
  window.addEventListener("keydown", (e) => {
    // Toggle panel visibility with the 'h' key
    if (e.key === "h" || e.key === "H") {
      togglePaneVisibility();
    }
  });
}
// Function to toggle the panel visibility
function togglePaneVisibility() {
  if (!paneInstance) return;
  const element = paneInstance.element;
  if (element.style.display === "none") {
    element.style.display = "";
  } else {
    element.style.display = "none";
  }
}
// Update CSS variable for border radius
function updateBorderRadius() {
  document.documentElement.style.setProperty(
    "--border-radius",
    `${settings.borderRadius}px`
  );
}
// Update CSS variable for item vignette
function updateVignetteSize() {
  document.documentElement.style.setProperty(
    "--vignette-size",
    `${settings.vignetteSize}px`
  );
}
// Update CSS variable for page vignette - now using the simplified controls
function updatePageVignette() {
  const strength = settings.vignetteStrength;
  const size = settings.vignetteSize;
  // Regular vignette (outer layer)
  const regularOpacity = strength * 0.7;
  const regularSize = size * 1.5;
  document.documentElement.style.setProperty(
    "--page-vignette-size",
    `${regularSize}px`
  );
  document.documentElement.style.setProperty(
    "--page-vignette-color",
    `rgba(0,0,0,${regularOpacity})`
  );
  // Strong vignette (middle layer)
  const strongOpacity = strength * 0.85;
  const strongSize = size * 0.75;
  document.documentElement.style.setProperty(
    "--page-vignette-strong-size",
    `${strongSize}px`
  );
  document.documentElement.style.setProperty(
    "--page-vignette-strong-color",
    `rgba(0,0,0,${strongOpacity})`
  );
  // Extreme vignette (inner layer)
  const extremeOpacity = strength;
  const extremeSize = size * 0.4;
  document.documentElement.style.setProperty(
    "--page-vignette-extreme-size",
    `${extremeSize}px`
  );
  document.documentElement.style.setProperty(
    "--page-vignette-extreme-color",
    `rgba(0,0,0,${extremeOpacity})`
  );
}
// Update CSS variable for hover scale
function updateHoverScale() {
  // Use CSS variables instead of directly modifying CSS rules
  document.documentElement.style.setProperty(
    "--hover-scale",
    settings.hoverScale
  );
  // Update all existing items with the new hover scale
  document.querySelectorAll(".item").forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      img.style.transition = "transform 0.3s ease";
    }
  });
}
// Update settings and rebuild the grid
function updateSettings() {
  // Update item sizes
  itemSizes = [
    {
      width: settings.baseWidth,
      height: settings.smallHeight
    },
    {
      width: settings.baseWidth,
      height: settings.largeHeight
    }
  ];
  itemGap = settings.itemGap;
  // Remove columns dependency - use a fixed value
  columns = 4;
  // Recalculate cell dimensions
  cellWidth = settings.baseWidth + settings.itemGap;
  cellHeight =
    Math.max(settings.smallHeight, settings.largeHeight) + settings.itemGap;
  // Clear existing items and rebuild
  visibleItems.forEach((itemId) => {
    const item = document.getElementById(itemId);
    if (item && item.parentNode === canvas) {
      canvas.removeChild(item);
    }
  });
  visibleItems.clear();
  updateVisibleItems();
  // Update visual styles
  updateBorderRadius();
  updateVignetteSize();
  updateHoverScale();
  updatePageVignette();
}

function setAndAnimateTitle(title) {
  if (titleSplit) titleSplit.revert();
  projectTitleElement.textContent = title;
  titleSplit = new SplitType(projectTitleElement, {
    types: "words"
  });
  gsap.set(titleSplit.words, {
    y: "100%"
  });
}

function animateTitleIn() {
  gsap.fromTo(
    titleSplit.words,
    {
      y: "100%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    }
  );
}

function animateTitleOut() {
  gsap.to(titleSplit.words, {
    y: "-100%",
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
  });
}
// Animate overlay in
function animateOverlayIn() {
  if (overlayAnimation) overlayAnimation.kill();
  // Make sure we're using the current setting value
  overlayAnimation = gsap.to(overlay, {
    opacity: settings.overlayOpacity,
    duration: settings.overlayEaseDuration,
    ease: "power2.inOut",
    overwrite: true
  });
}
// Animate overlay out
function animateOverlayOut() {
  if (overlayAnimation) overlayAnimation.kill();
  overlayAnimation = gsap.to(overlay, {
    opacity: 0,
    duration: settings.overlayEaseDuration,
    ease: "power2.inOut"
  });
}
// Determine item size based on position
function getItemSize(row, col) {
  // Use a consistent pattern for size selection
  // This ensures the same position always gets the same size
  const sizeIndex = Math.abs((row * columns + col) % itemSizes.length);
  return itemSizes[sizeIndex];
}
// Generate a unique ID for each grid position
function getItemId(col, row) {
  return `${col},${row}`;
}
// Get the absolute position for an item
function getItemPosition(col, row) {
  const xPos = col * cellWidth;
  const yPos = row * cellHeight;
  return {
    x: xPos,
    y: yPos
  };
}

function updateVisibleItems() {
  const buffer = settings.bufferZone;
  const viewWidth = window.innerWidth * (1 + buffer);
  const viewHeight = window.innerHeight * (1 + buffer);
  // Calculate visible range based on current position and buffer
  const startCol = Math.floor((-currentX - viewWidth / 2) / cellWidth);
  const endCol = Math.ceil((-currentX + viewWidth * 1.5) / cellWidth);
  const startRow = Math.floor((-currentY - viewHeight / 2) / cellHeight);
  const endRow = Math.ceil((-currentY + viewHeight * 1.5) / cellHeight);
  const currentItems = new Set();
  // Create or update visible items
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const itemId = getItemId(col, row);
      currentItems.add(itemId);
      if (visibleItems.has(itemId)) continue;
      if (activeItemId === itemId && isExpanded) continue;
      // Get size and position for this item
      const itemSize = getItemSize(row, col);
      const position = getItemPosition(col, row);
      // Create the item element
      const item = document.createElement("div");
      item.className = "item";
      item.id = itemId;
      item.style.width = `${itemSize.width}px`;
      item.style.height = `${itemSize.height}px`;
      item.style.left = `${position.x}px`;
      item.style.top = `${position.y}px`;
      item.dataset.col = col;
      item.dataset.row = row;
      item.dataset.width = itemSize.width;
      item.dataset.height = itemSize.height;
      // Calculate a consistent item number for this position
      // This ensures the same position always shows the same content
      const itemNum = Math.abs((row * columns + col) % itemCount);
      // Create image container for overflow control
      const imageContainer = document.createElement("div");
      imageContainer.className = "item-image-container";
      // Create image
      const img = document.createElement("img");
      img.src = imageUrls[itemNum % imageUrls.length];
      img.alt = `Image ${itemNum + 1}`;
      imageContainer.appendChild(img);
      item.appendChild(imageContainer);
      // Add caption inside the image
      const captionElement = document.createElement("div");
      captionElement.className = "item-caption";
      const nameElement = document.createElement("div");
      nameElement.className = "item-name";
      nameElement.textContent = items[itemNum];
      captionElement.appendChild(nameElement);
      const numberElement = document.createElement("div");
      numberElement.className = "item-number";
      numberElement.textContent = `#${(itemNum + 1)
        .toString()
        .padStart(5, "0")}`;
      captionElement.appendChild(numberElement);
      item.appendChild(captionElement);
      // Add click handler
      item.addEventListener("click", (e) => {
        if (mouseHasMoved || isDragging) return;
        handleItemClick(item, itemNum);
      });
      canvas.appendChild(item);
      visibleItems.add(itemId);
    }
  }
  // Remove items that are no longer visible
  visibleItems.forEach((itemId) => {
    if (!currentItems.has(itemId) || (activeItemId === itemId && isExpanded)) {
      const item = document.getElementById(itemId);
      if (item && item.parentNode === canvas) {
        canvas.removeChild(item);
      }
      visibleItems.delete(itemId);
    }
  });
}

function handleItemClick(item, itemIndex) {
  if (isExpanded) {
    if (expandedItem) closeExpandedItem();
  } else {
    expandItem(item, itemIndex);
  }
}

function expandItem(item, itemIndex) {
  isExpanded = true;
  activeItem = item;
  activeItemId = item.id;
  canDrag = false;
  container.style.cursor = "auto";
  const imgSrc = item.querySelector("img").src;
  const titleIndex = itemIndex % items.length;
  const itemWidth = parseInt(item.dataset.width);
  const itemHeight = parseInt(item.dataset.height);
  setAndAnimateTitle(items[titleIndex]);
  // Get the caption elements
  const nameElement = item.querySelector(".item-name");
  const numberElement = item.querySelector(".item-number");
  // Store original text content for later use
  const nameText = nameElement.textContent;
  const numberText = numberElement.textContent;
  // Create a direct clone of the caption elements for animation
  const captionClone = item.querySelector(".item-caption").cloneNode(true);
  captionClone.classList.add("caption-clone");
  const nameClone = captionClone.querySelector(".item-name");
  const numberClone = captionClone.querySelector(".item-number");
  // Apply SplitType to the cloned elements - use words for both
  const nameCloneSplit = new SplitType(nameClone, {
    types: "words"
  });
  const numberCloneSplit = new SplitType(numberClone, {
    types: "words"
  });
  // Position the clone exactly over the original
  const captionRect = item
    .querySelector(".item-caption")
    .getBoundingClientRect();
  captionClone.style.left = `${captionRect.left}px`;
  captionClone.style.bottom = `${window.innerHeight - captionRect.bottom}px`;
  captionClone.style.width = `${captionRect.width}px`;
  captionClone.style.zIndex = "10002"; // Explicitly set z-index
  document.body.appendChild(captionClone);
  // Hide the original caption immediately
  item.querySelector(".item-caption").style.opacity = "0";
  // Animate the clone out with clear text movement
  gsap.to(nameCloneSplit.words, {
    y: "100%",
    opacity: 0,
    duration: 0.6,
    stagger: 0.03,
    ease: "power3.in"
  });
  gsap.to(numberCloneSplit.words, {
    y: "100%",
    opacity: 0,
    duration: 0.6,
    stagger: 0.02,
    delay: 0.05,
    ease: "power3.in",
    onComplete: () => {
      if (captionClone.parentNode) {
        document.body.removeChild(captionClone);
      }
    }
  });
  const rect = item.getBoundingClientRect();
  originalPosition = {
    id: item.id,
    rect: rect,
    imgSrc: imgSrc,
    width: itemWidth,
    height: itemHeight,
    nameText: nameText,
    numberText: numberText
  };
  // Add active class to overlay but animate opacity with GSAP
  overlay.classList.add("active");
  animateOverlayIn();
  expandedItem = document.createElement("div");
  expandedItem.className = "expanded-item";
  expandedItem.style.width = `${itemWidth}px`;
  expandedItem.style.height = `${itemHeight}px`;
  expandedItem.style.zIndex = "10000"; // Explicitly set z-index
  // Apply the same border radius as the items
  expandedItem.style.borderRadius = `var(--border-radius, 0px)`;
  const img = document.createElement("img");
  img.src = imgSrc;
  expandedItem.appendChild(img);
  expandedItem.addEventListener("click", closeExpandedItem);
  document.body.appendChild(expandedItem);
  // Fade out other items with GSAP
  document.querySelectorAll(".item").forEach((el) => {
    if (el !== activeItem) {
      gsap.to(el, {
        opacity: 0,
        duration: settings.overlayEaseDuration,
        ease: "power2.inOut"
      });
    }
  });
  const viewportWidth = window.innerWidth;
  const targetWidth = viewportWidth * settings.expandedScale;
  // Maintain aspect ratio from original item
  const aspectRatio = itemHeight / itemWidth;
  const targetHeight = targetWidth * aspectRatio;
  gsap.delayedCall(0.5, animateTitleIn);
  gsap.fromTo(
    expandedItem,
    {
      width: itemWidth,
      height: itemHeight,
      x: rect.left + itemWidth / 2 - window.innerWidth / 2,
      y: rect.top + itemHeight / 2 - window.innerHeight / 2
    },
    {
      width: targetWidth,
      height: targetHeight,
      x: 0,
      y: 0,
      duration: settings.zoomDuration, // Use the faster zoom duration
      ease: "hop"
    }
  );
}

function closeExpandedItem() {
  if (!expandedItem || !originalPosition) return;
  animateTitleOut();
  animateOverlayOut();
  // Fade in other items with GSAP
  document.querySelectorAll(".item").forEach((el) => {
    if (el.id !== activeItemId) {
      gsap.to(el, {
        opacity: 1,
        duration: settings.overlayEaseDuration,
        delay: 0.3,
        ease: "power2.inOut"
      });
    }
  });
  const originalItem = document.getElementById(activeItemId);
  if (originalItem) {
    const nameElement = originalItem.querySelector(".item-name");
    const numberElement = originalItem.querySelector(".item-number");
    // Reset the text content to ensure clean animation
    nameElement.textContent = originalPosition.nameText;
    numberElement.textContent = originalPosition.numberText;
    // Keep the caption hidden until animation completes
    originalItem.querySelector(".item-caption").style.opacity = "0";
  }
  const originalRect = originalPosition.rect;
  const originalWidth = originalPosition.width;
  const originalHeight = originalPosition.height;
  gsap.to(expandedItem, {
    width: originalWidth,
    height: originalHeight,
    x: originalRect.left + originalWidth / 2 - window.innerWidth / 2,
    y: originalRect.top + originalHeight / 2 - window.innerHeight / 2,
    duration: settings.zoomDuration, // Use the faster zoom duration
    ease: "hop",
    onComplete: () => {
      // Create the caption animation BEFORE removing the expanded item
      if (originalItem) {
        // Create a clone for animation
        const captionElement = originalItem.querySelector(".item-caption");
        const captionClone = document.createElement("div");
        captionClone.className = "caption-clone";
        captionClone.innerHTML = captionElement.innerHTML;
        // Get the position of where the caption should appear
        const captionRect = captionElement.getBoundingClientRect();
        // Position the clone exactly
        captionClone.style.position = "fixed";
        captionClone.style.left = `${captionRect.left}px`;
        captionClone.style.bottom = `${
          window.innerHeight - captionRect.bottom
        }px`;
        captionClone.style.width = `${captionRect.width}px`;
        captionClone.style.padding = "10px";
        captionClone.style.zIndex = "10002"; // Explicitly set z-index
        document.body.appendChild(captionClone);
        // Apply SplitType to the cloned elements
        const nameClone = captionClone.querySelector(".item-name");
        const numberClone = captionClone.querySelector(".item-number");
        // Make sure the clone elements have the same styling
        nameClone.style.overflow = "hidden";
        numberClone.style.overflow = "hidden";
        const nameCloneSplit = new SplitType(nameClone, {
          types: "words"
        });
        const numberCloneSplit = new SplitType(numberClone, {
          types: "words"
        });
        // Set initial position for animation - start from below
        gsap.set(nameCloneSplit.words, {
          y: "100%",
          opacity: 0
        });
        gsap.set(numberCloneSplit.words, {
          y: "100%",
          opacity: 0
        });
        // Animate the clone in with clear staggered animation
        gsap.to(nameCloneSplit.words, {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.03,
          ease: "power3.out"
        });
        gsap.to(numberCloneSplit.words, {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.02,
          delay: 0.05,
          ease: "power3.out",
          onComplete: () => {
            // Show the original caption
            captionElement.style.opacity = "1";
            // Remove the clone
            if (captionClone.parentNode) {
              document.body.removeChild(captionClone);
            }
          }
        });
      }
      if (expandedItem && expandedItem.parentNode) {
        document.body.removeChild(expandedItem);
      }
      if (originalItem) {
        originalItem.style.visibility = "visible";
      }
      expandedItem = null;
      isExpanded = false;
      activeItem = null;
      originalPosition = null;
      activeItemId = null;
      canDrag = true;
      container.style.cursor = "grab";
      dragVelocityX = 0;
      dragVelocityY = 0;
      // Remove active class from overlay after animation completes
      overlay.classList.remove("active");
    }
  });
}

function animate() {
  if (canDrag) {
    const ease = settings.dragEase;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    canvas.style.transform = `translate(${currentX}px, ${currentY}px)`;
    const now = Date.now();
    const distMoved = Math.sqrt(
      Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
    );
    if (distMoved > 100 || now - lastUpdateTime > 120) {
      updateVisibleItems();
      lastX = currentX;
      lastY = currentY;
      lastUpdateTime = now;
    }
  }
  requestAnimationFrame(animate);
}
container.addEventListener("mousedown", (e) => {
  if (!canDrag) return;
  isDragging = true;
  mouseHasMoved = false;
  startX = e.clientX;
  startY = e.clientY;
  container.style.cursor = "grabbing";
});
window.addEventListener("mousemove", (e) => {
  if (!isDragging || !canDrag) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    mouseHasMoved = true;
  }
  const now = Date.now();
  const dt = Math.max(10, now - lastDragTime);
  lastDragTime = now;
  dragVelocityX = dx / dt;
  dragVelocityY = dy / dt;
  targetX += dx;
  targetY += dy;
  startX = e.clientX;
  startY = e.clientY;
});
window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  if (canDrag) {
    container.style.cursor = "grab";
    if (Math.abs(dragVelocityX) > 0.1 || Math.abs(dragVelocityY) > 0.1) {
      const momentumFactor = settings.momentumFactor;
      targetX += dragVelocityX * momentumFactor;
      targetY += dragVelocityY * momentumFactor;
    }
  }
});
overlay.addEventListener("click", () => {
  if (isExpanded) closeExpandedItem();
});
container.addEventListener("touchstart", (e) => {
  if (!canDrag) return;
  isDragging = true;
  mouseHasMoved = false;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
window.addEventListener("touchmove", (e) => {
  if (!isDragging || !canDrag) return;
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    mouseHasMoved = true;
  }
  targetX += dx;
  targetY += dy;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
window.addEventListener("touchend", () => {
  isDragging = false;
});
window.addEventListener("resize", () => {
  if (isExpanded && expandedItem) {
    const viewportWidth = window.innerWidth;
    const targetWidth = viewportWidth * settings.expandedScale;
    // Maintain aspect ratio
    const originalWidth = originalPosition.width;
    const originalHeight = originalPosition.height;
    const aspectRatio = originalHeight / originalWidth;
    const targetHeight = targetWidth * aspectRatio;
    gsap.to(expandedItem, {
      width: targetWidth,
      height: targetHeight,
      duration: 0.3,
      ease: "power2.out"
    });
  } else {
    updateVisibleItems();
  }
});
// Add this right before the // Initialize comment
function initializeStyles() {
  updateBorderRadius();
  updateVignetteSize();
  updateHoverScale();
  updatePageVignette();
}
// Initialize
initializeStyles();
updateVisibleItems();
animate();
// Initialize Tweakpane after a short delay to ensure DOM is ready
setTimeout(initTweakpane, 500);
