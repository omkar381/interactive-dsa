# 📚 Data Structures Visualization - Complete Documentation

## 👥 Team Members
- **Nagaraj** (3PD24CS121) - Memory Management (malloc, calloc, realloc, free)
- **Omkar** (3PD24CS131) - Stack & Queue Operations
- **Prajwal** (3PD24CS140) - Linked List Operations

## 👩‍🏫 Guide
**Dr. Pooja Aspalli Ma'am**

---

# 🏗️ PROJECT STRUCTURE

```
dscc/
├── index.html    → Main HTML structure (the webpage layout)
├── style.css     → All styling (colors, fonts, animations)
├── app.js        → All JavaScript logic (interactivity & data structures)
└── README.md     → This documentation file
```

---

# 📄 FILE 1: index.html (The Structure)

## What is HTML?
HTML (HyperText Markup Language) defines the **structure** of a webpage. Think of it like the skeleton of a human body.

## Key Sections Explained:

### 1. Head Section
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Structures - Whiteboard Style</title>
  <link rel="stylesheet" href="style.css">
</head>
```
**Explanation:**
- `charset="UTF-8"` → Allows special characters and emojis
- `viewport` → Makes website responsive on mobile devices
- `<link>` → Connects the CSS file for styling

### 2. Font Imports (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&..." rel="stylesheet">
```
**Fonts Used:**
- **Caveat** → Handwritten style for titles
- **Patrick Hand** → Casual handwriting for text
- **Shadows Into Light** → Sketchy chalk-like text
- **JetBrains Mono** → Code/monospace font for algorithms

### 3. Page Layout (Three Panels)

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo + Title                              Guide Info            │
├──────────────┬─────────────────────────────┬────────────────────┤
│              │                             │                    │
│   LEFT       │        CENTER               │      RIGHT         │
│   PANEL      │        (Whiteboard)         │      PANEL         │
│              │                             │                    │
│  - Topic     │   - Visualization Area      │  - Behind the      │
│    Selector  │   - Floating Controls       │    Scenes          │
│  - Definition│   - Status Display          │  - Algorithm       │
│              │                             │  - Live Status     │
│              │                             │  - Key Concepts    │
└──────────────┴─────────────────────────────┴────────────────────┘
```

### 4. Member Buttons (Topic Selector)
```html
<button class="member-btn" data-member="nagaraj">
  <div class="member-info">
    <span class="member-name">Nagaraj</span>
    <span class="member-usn">3PD24CS121</span>
  </div>
  <span class="member-topic">Memory Management</span>
</button>
```
**How it works:**
- `data-member="nagaraj"` → Custom attribute that JavaScript reads
- When clicked, JavaScript uses this value to switch views
- The `active` class highlights the selected button

### 5. Whiteboard Area
```html
<div class="whiteboard" id="visualization">
  <!-- Dynamic content inserted by JavaScript -->
</div>
```
**How it works:**
- This is an empty container
- JavaScript dynamically fills it with stack/queue/list visuals
- `id="visualization"` → JavaScript finds this element using `getElementById`

### 6. Floating Controls
```html
<div class="floating-controls">
  <div class="control-content" id="control-content">
    <!-- Buttons are inserted here by JavaScript -->
  </div>
</div>
```
**How it works:**
- Controls change based on which topic is selected
- Stack shows: Push, Pop buttons
- Queue shows: Enqueue, Dequeue buttons
- Linked List shows: Insert Head, Insert Tail, Delete buttons

---

# 🎨 FILE 2: style.css (The Styling)

## What is CSS?
CSS (Cascading Style Sheets) controls how HTML elements **look**. Think of it like clothes and makeup for the skeleton.

## Key Concepts:

### 1. CSS Variables (Custom Properties)
```css
:root {
  --chalk-dark: #2d2d2d;
  --chalk-light: #f5f3ef;
  --pastel-yellow: #fff3b0;
  --pastel-green: #b8f0b8;
  --pastel-blue: #b8d4f0;
  --pastel-pink: #f0b8d4;
  --pastel-purple: #d4b8f0;
  
  --font-chalk: 'Shadows Into Light', cursive;
  --font-handwriting: 'Patrick Hand', cursive;
}
```
**Explanation:**
- Variables start with `--`
- Used as `var(--chalk-dark)` anywhere in CSS
- Easy to change colors in one place

### 2. Grid Layout (Three Column Design)
```css
.main-content {
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 16px;
}
```
**Explanation:**
- `display: grid` → Enables CSS Grid layout
- `320px 1fr 320px` → Left panel 320px, Center takes remaining space (1fr), Right panel 320px
- `gap: 16px` → Space between grid items

### 3. Flexbox (Alignment)
```css
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
**Explanation:**
- `display: flex` → Enables Flexbox layout
- `justify-content: space-between` → Pushes items to opposite ends
- `align-items: center` → Vertically centers items

### 4. Animations
```css
@keyframes pop-in {
  0% { 
    transform: scale(0) translateY(-20px); 
    opacity: 0; 
  }
  70% { 
    transform: scale(1.1) translateY(0); 
  }
  100% { 
    transform: scale(1) translateY(0); 
    opacity: 1; 
  }
}

.pop-in {
  animation: pop-in 0.4s ease-out forwards;
}
```
**Explanation:**
- `@keyframes` → Defines animation steps
- `0%` → Start state, `100%` → End state
- `transform: scale()` → Makes element grow/shrink
- `opacity` → Makes element fade in/out
- `animation: pop-in 0.4s` → Apply animation for 0.4 seconds

### 5. Hover Effects
```css
.member-btn:hover {
  transform: translateX(4px);
  background: var(--pastel-yellow);
}
```
**Explanation:**
- `:hover` → Style applied when mouse is over element
- `transform: translateX(4px)` → Moves element 4 pixels right

### 6. Stack Element Styling
```css
.stack-element {
  background: linear-gradient(135deg, var(--pastel-blue), var(--pastel-purple));
  padding: 16px 32px;
  border-radius: 8px;
  font-family: var(--font-handwriting);
  font-size: 1.4rem;
  transform: rotate(calc(var(--tilt) * 1deg));
}
```
**Explanation:**
- `linear-gradient` → Creates color transition effect
- `border-radius` → Rounds the corners
- `transform: rotate()` → Tilts element slightly for hand-drawn look
- `var(--tilt)` → Random tilt value set by JavaScript

---

# ⚙️ FILE 3: app.js (The Logic)

## What is JavaScript?
JavaScript makes the webpage **interactive**. It handles button clicks, updates the display, and manages the data structures.

## Complete Code Breakdown:

---

## SECTION 1: Configuration Constants

```javascript
const CONFIG = {
  STACK_MAX_SIZE: 8,      // Maximum elements in stack
  QUEUE_MAX_SIZE: 8,      // Maximum elements in queue
  LINKEDLIST_MAX_SIZE: 6, // Maximum nodes in linked list
  HEAP_SIZE: 256,         // Total heap memory (bytes)
  ANIMATION_DURATION: 400 // Animation time in milliseconds
};
```
**Why we use constants:**
- Easy to change limits in one place
- Prevents "magic numbers" scattered in code
- Makes code more readable

---

## SECTION 2: Member Configuration

```javascript
const MEMBERS = {
  nagaraj: {
    name: 'Nagaraj',
    usn: '3PD24CS121',
    topic: 'Memory Management',
    definition: {
      title: 'What is Dynamic Memory?',
      text: 'Memory allocated during program execution from the heap.',
      points: [
        'malloc() allocates uninitialized memory',
        'calloc() allocates zero-initialized memory',
        'realloc() resizes existing allocation',
        'free() releases allocated memory'
      ]
    }
  },
  omkar: {
    name: 'Omkar',
    usn: '3PD24CS131',
    topic: 'Stack & Queue',
    definition: {
      title: 'What is a Stack?',
      text: 'A Stack is a linear data structure that follows LIFO principle.',
      points: [
        'LIFO: Last In, First Out',
        'Push: Add element to top',
        'Pop: Remove element from top',
        'Peek: View top element'
      ]
    }
  },
  prajwal: {
    name: 'Prajwal',
    usn: '3PD24CS140',
    topic: 'Linked List',
    definition: {
      title: 'What is a Linked List?',
      text: 'A sequence of nodes where each node contains data and a pointer.',
      points: [
        'Dynamic size - grows/shrinks as needed',
        'Each node has data + next pointer',
        'Head points to first node',
        'Last node points to NULL'
      ]
    }
  }
};
```
**How this is used:**
- When user clicks a member button, we look up their info here
- The definition is displayed in the left panel
- The topic label updates on the whiteboard

---

## SECTION 3: Pseudocode Templates

```javascript
const PSEUDOCODE = {
  stack: {
    push: `function push(element):
    if top >= MAX_SIZE - 1:
        return "OVERFLOW"
    top = top + 1
    stack[top] = element
    return "SUCCESS"`,
    pop: `function pop():
    if top < 0:
        return "UNDERFLOW"
    element = stack[top]
    top = top - 1
    return element`
  },
  // ... queue and linkedlist pseudocode
};
```
**Purpose:**
- Shows the algorithm being visualized
- Displayed in the "Behind the Scenes" panel
- Helps understand what's happening step by step

---

## SECTION 4: Application State

```javascript
const state = {
  currentMember: 'omkar',      // Currently selected member
  currentSubView: 'stack',     // Stack or Queue view
  isAnimating: false,          // Prevents clicks during animation
  
  // Data structures (stored as arrays)
  stack: [],           // Stack elements
  queue: [],           // Queue elements
  linkedList: [],      // Linked list nodes
  memoryBlocks: [],    // Memory allocations
  nextMemId: 1,        // Counter for memory block IDs
  
  // Step navigation
  currentSteps: [],
  currentStepIndex: 0
};
```
**What is "State"?**
- State = Current condition of the application
- `stack: []` → Empty array that holds stack values
- When you push "A", it becomes `stack: ['A']`
- When you push "B", it becomes `stack: ['A', 'B']`

---

## SECTION 5: DOM References

```javascript
let DOM = {};

function initDOM() {
  DOM = {
    memberBtns: document.querySelectorAll('.member-btn'),
    topicLabel: document.getElementById('topic-label'),
    visualization: document.getElementById('visualization'),
    controlContent: document.getElementById('control-content'),
    pseudocode: document.getElementById('pseudocode'),
    // ... more elements
  };
}
```
**What is DOM?**
- DOM = Document Object Model
- It's how JavaScript "sees" the HTML page
- `document.getElementById('visualization')` → Finds the element with id="visualization"
- We store references to avoid searching repeatedly

---

## SECTION 6: Utility Functions

### 6.1 Delay Function (for animations)
```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```
**How it works:**
- Creates a "pause" for the specified milliseconds
- Used with `await delay(400)` to wait 400ms
- Essential for step-by-step animations

### 6.2 Show Toast Message
```javascript
function showToast(message, icon = '💡') {
  if (DOM.toastText) DOM.toastText.innerHTML = `${icon} ${message}`;
}
```
**How it works:**
- Displays a notification message
- Default icon is 💡, but can be changed (❌, ✓, ⚠️)

### 6.3 Update Status Display
```javascript
function updateStatus(size, capacity) {
  if (DOM.statusSize) DOM.statusSize.textContent = size;
  if (DOM.statusCapacity) DOM.statusCapacity.textContent = capacity;
}
```
**How it works:**
- Updates "Size: X" and "Capacity: Y" on screen
- Shows how full the data structure is

---

## SECTION 7: View Switching

```javascript
function switchMember(member) {
  if (state.isAnimating) return;  // Don't switch during animation
  
  state.currentMember = member;
  const config = MEMBERS[member];
  
  // Update active button styling
  DOM.memberBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.member === member);
  });
  
  // Update topic label with fade animation
  DOM.topicLabel.style.opacity = 0;
  setTimeout(() => {
    DOM.topicLabel.textContent = config.topic;
    DOM.topicLabel.style.opacity = 1;
  }, 200);
  
  // Update left panel definition
  DOM.leftDefinitionTitle.textContent = config.definition.title;
  DOM.leftDefinitionText.innerHTML = config.definition.text;
  
  // Initialize the correct view
  DOM.visualization.classList.add('fade-out');
  setTimeout(() => {
    switch (member) {
      case 'nagaraj':
        initMemoryView();
        break;
      case 'omkar':
        state.currentSubView = 'stack';
        initStackQueueView();
        break;
      case 'prajwal':
        initLinkedListView();
        break;
    }
    DOM.visualization.classList.remove('fade-out');
  }, 300);
}
```
**Step-by-step explanation:**
1. Check if animation is running → if yes, ignore click
2. Update `state.currentMember` to new value
3. Get member's config from `MEMBERS` object
4. Loop through all buttons, add 'active' class to clicked one
5. Fade out topic label, change text, fade back in
6. Update definition section with new content
7. Fade out visualization, switch view, fade back in

---

## SECTION 8: Stack Implementation (Omkar's Topic)

### 8.1 Initialize Stack View
```javascript
function initStackQueueView() {
  // Create control buttons dynamically
  DOM.controlContent.innerHTML = `
    <div class="view-toggle">
      <button class="sketch-btn" id="show-stack">Stack</button>
      <button class="sketch-btn" id="show-queue">Queue</button>
    </div>
    <input type="text" class="sketch-input" id="value-input" placeholder="Enter value...">
    <div class="btn-row">
      <button class="sketch-btn success" id="add-btn">Push</button>
      <button class="sketch-btn danger" id="remove-btn">Pop</button>
    </div>
  `;
  
  // Attach event listeners to buttons
  document.getElementById('add-btn').addEventListener('click', () => {
    state.currentSubView === 'stack' ? stackPush() : queueEnqueue();
  });
  
  // Render the stack visualization
  renderStack();
}
```
**What's happening:**
1. `innerHTML` replaces the control panel content with new buttons
2. `addEventListener('click', ...)` → When button clicked, run function
3. `renderStack()` draws the current stack state

### 8.2 Stack Push Operation
```javascript
async function stackPush() {
  // Prevent multiple clicks during animation
  if (state.isAnimating) return;
  
  // Get input value
  const input = document.getElementById('value-input');
  const value = input.value.trim();
  
  // Validate input
  if (!value) {
    showToast('Please enter a value!', '⚠️');
    return;
  }
  
  // Check for overflow
  if (state.stack.length >= CONFIG.STACK_MAX_SIZE) {
    showToast('Stack Overflow! Cannot push.', '❌');
    return;
  }
  
  // Start animation
  state.isAnimating = true;
  
  // Show steps
  const steps = [
    `Pushing "${value}" onto the stack...`,
    'Checking if stack is full...',
    'Incrementing TOP pointer...',
    `Placing "${value}" at TOP position`,
    '✓ Push complete!'
  ];
  updateNarration(steps);
  
  // Actually add to array
  state.stack.push(value);
  input.value = '';  // Clear input
  
  // Re-render with animation
  renderStack(state.stack.length - 1, 'pop-in');
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  showToast(`Pushed "${value}" onto stack`, '📥');
  
  // Wait for animation
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}
```

**The `async/await` explained:**
```javascript
async function example() {
  console.log("Start");
  await delay(1000);  // Wait 1 second
  console.log("End");
}
```
- `async` → This function can use `await`
- `await` → Pause here until the Promise resolves
- Allows animations to complete before continuing

### 8.3 Stack Pop Operation
```javascript
async function stackPop() {
  if (state.isAnimating) return;
  
  // Check for underflow
  if (state.stack.length === 0) {
    showToast('Stack Underflow! Nothing to pop.', '❌');
    return;
  }
  
  state.isAnimating = true;
  
  // Get value at top (before removing)
  const value = state.stack[state.stack.length - 1];
  
  // Show animation - highlight first
  renderStack(state.stack.length - 1, 'highlight-pop');
  await delay(200);
  
  // Then animate flying out
  renderStack(state.stack.length - 1, 'pop-out-up');
  await delay(500);
  
  // Actually remove from array
  state.stack.pop();
  
  // Re-render without the element
  renderStack();
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  showToast(`Popped "${value}" from stack`, '📤');
  
  state.isAnimating = false;
}
```

### 8.4 Render Stack Visualization
```javascript
function renderStack(highlightIndex = -1, animClass = '') {
  // Empty state
  if (state.stack.length === 0) {
    DOM.visualization.innerHTML = `
      <div class="stack-sketch">
        <div class="stack-drawing">
          <div class="stack-empty">Stack is empty<br>Push something!</div>
        </div>
      </div>
    `;
    return;
  }
  
  // Build HTML for each element
  let elements = '';
  state.stack.forEach((val, i) => {
    const isTop = i === state.stack.length - 1;
    const tilt = (Math.random() - 0.5) * 2;  // Random tilt for hand-drawn look
    elements += `
      <div class="stack-element ${isTop ? 'top-element' : ''} ${i === highlightIndex ? animClass : ''}" 
           style="--tilt: ${tilt}">
        ${val}
      </div>
    `;
  });
  
  // Insert into DOM
  DOM.visualization.innerHTML = `
    <div class="stack-sketch">
      <div class="stack-drawing">${elements}</div>
      <div class="stack-label">LIFO: Last In, First Out</div>
    </div>
  `;
}
```

**The `forEach` loop explained:**
```javascript
state.stack.forEach((val, i) => {
  // val = current element value ("A", "B", etc.)
  // i = index (0, 1, 2, etc.)
});
```

---

## SECTION 9: Queue Implementation (Omkar's Topic)

### Queue Enqueue (Add to rear)
```javascript
async function queueEnqueue() {
  // Similar to stackPush, but adds to end of queue
  state.queue.push(value);  // Add to rear
  renderQueue(state.queue.length - 1, 'pop-in');
}
```

### Queue Dequeue (Remove from front)
```javascript
async function queueDequeue() {
  // Show animation at front (index 0)
  renderQueue(0, 'dequeue-out-left');
  await delay(500);
  
  // Remove first element
  state.queue.shift();  // shift() removes from front
  
  renderQueue();
}
```

**Key difference from Stack:**
- Stack: `push()` adds to end, `pop()` removes from end → LIFO
- Queue: `push()` adds to end, `shift()` removes from front → FIFO

---

## SECTION 10: Linked List Implementation (Prajwal's Topic)

### 10.1 Insert at Head
```javascript
async function llInsertHead() {
  const value = input.value.trim();
  
  // Add to beginning of array
  state.linkedList.unshift(value);  // unshift() adds to front
  
  renderLinkedList(0, 'pop-in');
}
```

### 10.2 Insert at Tail
```javascript
async function llInsertTail() {
  // Add to end of array
  state.linkedList.push(value);
  
  renderLinkedList(state.linkedList.length - 1, 'pop-in');
}
```

### 10.3 Delete Node
```javascript
async function llDelete() {
  const value = input.value.trim();
  
  // Find index of value
  const index = state.linkedList.indexOf(value);
  
  if (index === -1) {
    showToast(`"${value}" not found!`, '❌');
    return;
  }
  
  // Animate deletion
  renderLinkedList(index, 'fade-out');
  await delay(300);
  
  // Remove from array
  state.linkedList.splice(index, 1);
  
  renderLinkedList();
}
```

**Array methods used:**
- `unshift(value)` → Add to beginning
- `push(value)` → Add to end
- `indexOf(value)` → Find position (-1 if not found)
- `splice(index, 1)` → Remove 1 element at index

### 10.4 Render Linked List
```javascript
function renderLinkedList(highlightIndex = -1, animClass = '') {
  let nodes = '<span class="head-label">HEAD</span>';
  
  state.linkedList.forEach((val, i) => {
    nodes += `
      <div class="node-box ${i === highlightIndex ? animClass : ''}">
        <div class="node-data">${val}</div>
        <div class="node-next">next</div>
      </div>
      ${i < state.linkedList.length - 1 
        ? '<span class="node-arrow">→</span>' 
        : '<span class="node-arrow">→</span><span class="node-null">NULL</span>'}
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="linkedlist-sketch">
      <div class="linkedlist-drawing">${nodes}</div>
    </div>
  `;
}
```

---

## SECTION 11: Memory Management (Nagaraj's Topic)

### 11.1 malloc - Allocate Memory
```javascript
async function memMalloc() {
  const name = document.getElementById('mem-name').value.trim() || `p${state.nextMemId}`;
  const size = parseInt(document.getElementById('mem-size').value) || 0;
  
  // Validate
  if (size <= 0 || size > 128) {
    showToast('Enter size (1-128 bytes)', '⚠️');
    return;
  }
  
  // Check if enough memory
  if (getTotalAllocated() + size > CONFIG.HEAP_SIZE) {
    showToast('Not enough memory!', '❌');
    return;
  }
  
  // Create memory block object
  const block = {
    id: state.nextMemId++,
    name: name,
    size: size,
    addr: generateAddr(),  // Random hex address like 0x1A3F
    type: 'malloc'
  };
  
  // Add to memory blocks array
  state.memoryBlocks.push(block);
  
  renderMemory(block.id, 'pop-in');
  showToast(`malloc: ${size} bytes for "${name}"`, '📦');
}
```

### 11.2 calloc - Allocate Zeroed Memory
```javascript
async function memCalloc() {
  // Same as malloc, but type is 'calloc'
  // Visual difference: different color in rendering
  const block = {
    // ...same properties
    type: 'calloc'  // Green color instead of yellow
  };
}
```

### 11.3 realloc - Resize Allocation
```javascript
async function memRealloc() {
  const blockId = parseInt(document.getElementById('mem-select').value);
  const newSize = parseInt(document.getElementById('mem-size').value);
  
  // Find the block
  const block = state.memoryBlocks.find(b => b.id === blockId);
  
  // Update size
  const oldSize = block.size;
  block.size = newSize;
  block.addr = generateAddr();  // New address (memory moved)
  
  renderMemory(block.id, 'pop-in');
}
```

### 11.4 free - Release Memory
```javascript
async function memFree() {
  const blockId = parseInt(document.getElementById('mem-select').value);
  
  // Find index in array
  const index = state.memoryBlocks.findIndex(b => b.id === blockId);
  
  // Animate fade out
  renderMemory(block.id, 'fade-out');
  await delay(400);
  
  // Remove from array
  state.memoryBlocks.splice(index, 1);
  
  renderMemory();
  showToast(`free: Released "${block.name}"`, '🗑️');
}
```

### 11.5 Render Memory Visualization
```javascript
function renderMemory(highlightId = -1, animClass = '') {
  const total = getTotalAllocated();
  const free = CONFIG.HEAP_SIZE - total;
  
  let blocks = '';
  state.memoryBlocks.forEach(b => {
    // Calculate width as percentage of total heap
    const width = Math.max((b.size / CONFIG.HEAP_SIZE) * 100, 10);
    blocks += `
      <div class="mem-block ${b.type === 'malloc' ? 'allocated-malloc' : 'allocated-calloc'}"
           style="width: ${width}%;">
        <span class="block-name">${b.name}</span>
        <span class="block-addr">${b.addr}</span>
        <span class="block-size">${b.size}B</span>
      </div>
    `;
  });
  
  // Add free space block
  if (free > 0) {
    blocks += `
      <div class="mem-block free-space" style="width: ${(free / CONFIG.HEAP_SIZE) * 100}%;">
        <span>FREE</span>
      </div>
    `;
  }
  
  DOM.visualization.innerHTML = `
    <div class="memory-sketch">
      <div class="heap-bar">${blocks}</div>
      <div class="mem-legend">
        <div class="legend-item">malloc (uninitialized)</div>
        <div class="legend-item">calloc (zeroed)</div>
        <div class="legend-item">Free space</div>
      </div>
    </div>
  `;
}
```

---

## SECTION 12: Initialization (App Startup)

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM references
  initDOM();
  
  // Set up click handlers for member buttons
  DOM.memberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchMember(btn.dataset.member);
    });
  });
  
  // Start with Omkar's Stack & Queue view
  switchMember('omkar');
  
  console.log('Data Structures - Whiteboard Style');
  console.log('Team: Nagaraj, Omkar, Prajwal');
});
```

**`DOMContentLoaded` explained:**
- Browser fires this event when HTML is fully loaded
- We wait for this before running JavaScript
- Ensures all elements exist before we try to find them

---

# 🎯 SUMMARY: How Each Part Connects

```
User clicks "Nagaraj" button
        ↓
Event listener triggers switchMember('nagaraj')
        ↓
switchMember() updates:
  - state.currentMember = 'nagaraj'
  - Topic label changes to "Memory Management"
  - Definition updates with Nagaraj's info
  - Calls initMemoryView()
        ↓
initMemoryView() creates:
  - Input fields for name and size
  - Buttons for malloc, calloc, realloc, free
  - Attaches click handlers to buttons
  - Calls renderMemory() to draw visualization
        ↓
User enters "ptr" and "32" and clicks "malloc"
        ↓
memMalloc() executes:
  - Validates input
  - Creates block object with id, name, size, address
  - Adds to state.memoryBlocks array
  - Calls renderMemory() to update display
        ↓
renderMemory() creates HTML:
  - Loops through state.memoryBlocks
  - Creates colored div for each block
  - Calculates width based on size
  - Inserts HTML into DOM.visualization
```

---

# 📝 IMPORTANT CONCEPTS TO REMEMBER

## 1. Data Structures as Arrays
```javascript
// Stack - use push() and pop()
state.stack = ['A', 'B', 'C'];
state.stack.push('D');  // ['A', 'B', 'C', 'D']
state.stack.pop();      // ['A', 'B', 'C'] - removes 'D'

// Queue - use push() and shift()
state.queue = ['A', 'B', 'C'];
state.queue.push('D');   // ['A', 'B', 'C', 'D']
state.queue.shift();     // ['B', 'C', 'D'] - removes 'A'

// Linked List - use unshift(), push(), splice()
state.linkedList = ['A', 'B', 'C'];
state.linkedList.unshift('X');  // ['X', 'A', 'B', 'C'] - add to front
state.linkedList.push('Y');     // ['X', 'A', 'B', 'C', 'Y'] - add to end
state.linkedList.splice(2, 1);  // ['X', 'A', 'C', 'Y'] - remove at index 2
```

## 2. Why We Use `async/await`
```javascript
// Without async/await - animations would overlap
function badPop() {
  renderStack(0, 'highlight');  // Highlight immediately
  renderStack(0, 'fly-out');    // Fly out immediately (no time to see highlight!)
  state.stack.pop();            // Remove immediately
}

// With async/await - animations happen in sequence
async function goodPop() {
  renderStack(0, 'highlight');  // Highlight
  await delay(300);             // Wait 300ms
  renderStack(0, 'fly-out');    // Then fly out
  await delay(500);             // Wait 500ms
  state.stack.pop();            // Then remove
}
```

## 3. Event Delegation
```javascript
// When buttons are created dynamically, we add listeners right after
DOM.controlContent.innerHTML = `<button id="push-btn">Push</button>`;
document.getElementById('push-btn').addEventListener('click', stackPush);
```

## 4. Template Literals (Backticks)
```javascript
// Regular string - hard to read
"<div class='element'>" + value + "</div>"

// Template literal - easy to read
`<div class="element">${value}</div>`

// Can be multi-line
`
  <div class="element">
    <span>${value}</span>
  </div>
`
```

---

# ❓ COMMON INTERVIEW QUESTIONS

### Q: How does the Stack work in your project?
**A:** "We use a JavaScript array to store stack elements. The `push()` method adds elements to the top, and `pop()` removes from the top. This follows LIFO (Last In, First Out). The visualization is created by looping through the array and generating HTML elements for each value."

### Q: What's the difference between malloc and calloc?
**A:** "Both allocate memory from the heap. malloc allocates uninitialized memory (contains garbage values), while calloc allocates zero-initialized memory (all bytes set to 0). In our visualization, malloc is shown in yellow and calloc in green."

### Q: How do animations work?
**A:** "We use CSS animations defined with @keyframes. JavaScript adds animation classes to elements (like 'pop-in' or 'fade-out'), and CSS handles the actual animation. We use async/await with a delay function to wait for animations to complete before proceeding."

### Q: Why use `document.getElementById()`?
**A:** "This method finds an HTML element by its id attribute. We store these references in a DOM object so we can easily update elements when data changes. For example, `DOM.visualization.innerHTML = ...` updates the whiteboard content."

### Q: How does view switching work?
**A:** "When a member button is clicked, the `switchMember()` function is called with that member's name. It updates the state, changes the definition panel content, and calls the appropriate init function (initStackQueueView, initLinkedListView, or initMemoryView) to set up that view's controls and visualization."

---

# 🚀 HOW TO RUN THE PROJECT

1. Open the folder containing all three files
2. Double-click `index.html` to open in browser
3. Or use VS Code with Live Server extension:
   - Right-click `index.html` → "Open with Live Server"

---

# 🙏 CREDITS

- **Design Inspiration:** Whiteboard/Classroom sketch style
- **Fonts:** Google Fonts (Caveat, Patrick Hand, Shadows Into Light, JetBrains Mono)
- **Icons:** Emoji characters

---

**Remember:** The key to understanding this code is following the flow:
1. **User Action** (click) →
2. **Event Handler** (function call) →
3. **State Update** (modify array) →
4. **Re-render** (update HTML display)

Good luck with your presentation! 🎓
