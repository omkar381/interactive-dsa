/**
 * ============================================
 * DATA STRUCTURES VISUALIZED
 * Interactive Learning Platform
 * ============================================
 * 
 * A comprehensive, animated data structure visualization tool
 * designed for beginners to understand core CS concepts.
 * 
 * Author: Omkar Padashetty
 * USN: 3PO24CS131
 * Guide: Dr. Pooja Aspalli Ma'am
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const CONFIG = {
  STACK_MAX_SIZE: 8,
  QUEUE_MAX_SIZE: 8,
  LINKEDLIST_MAX_SIZE: 10,
  TREE_MAX_SIZE: 15,
  DEFAULT_SPEED: 1,
  ANIMATION_BASE_DURATION: 500
};

// Data Structure Definitions
const DS_CONFIG = {
  stack: {
    badge: 'LIFO',
    analogy: 'Think of a stack of plates 🍽️ — you can only add or remove from the top! The last plate placed is the first one you pick up.',
    title: 'Understanding Stack',
    definition: {
      title: 'What is a Stack?',
      text: 'A <strong>Stack</strong> is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle. Imagine a stack of books — you can only add or remove books from the top.',
      points: [
        'LIFO: Last In, First Out',
        'All operations happen at the TOP',
        'O(1) time complexity for all operations',
        'Used in: Undo operations, Function calls, Browser history'
      ]
    },
    complexity: [
      { op: 'Push', value: 'O(1)', class: 'best' },
      { op: 'Pop', value: 'O(1)', class: 'best' },
      { op: 'Peek', value: 'O(1)', class: 'best' },
      { op: 'Space', value: 'O(n)', class: '' }
    ]
  },
  queue: {
    badge: 'FIFO',
    analogy: 'Think of a line at a bus stop 🚌 — the first person in line is the first to board! Fair and orderly.',
    title: 'Understanding Queue',
    definition: {
      title: 'What is a Queue?',
      text: 'A <strong>Queue</strong> is a linear data structure that follows the <strong>FIFO (First In, First Out)</strong> principle. Like a queue at a ticket counter — first come, first served!',
      points: [
        'FIFO: First In, First Out',
        'Insert at REAR, Remove from FRONT',
        'O(1) time complexity for all operations',
        'Used in: Print spooling, Task scheduling, BFS'
      ]
    },
    complexity: [
      { op: 'Enqueue', value: 'O(1)', class: 'best' },
      { op: 'Dequeue', value: 'O(1)', class: 'best' },
      { op: 'Front', value: 'O(1)', class: 'best' },
      { op: 'Space', value: 'O(n)', class: '' }
    ]
  },
  linkedlist: {
    badge: 'NODES',
    analogy: 'Think of a treasure hunt 🗺️ — each clue (node) contains a message (data) and points to the next clue (pointer)!',
    title: 'Understanding Linked List',
    definition: {
      title: 'What is a Linked List?',
      text: 'A <strong>Linked List</strong> is a chain of nodes where each node contains <strong>data</strong> and a <strong>pointer</strong> to the next node. Unlike arrays, elements are not stored contiguously in memory.',
      points: [
        'Dynamic size — grows and shrinks as needed',
        'Non-contiguous memory allocation',
        'No random access — must traverse sequentially',
        'Efficient insertions and deletions'
      ]
    },
    complexity: [
      { op: 'Insert (head)', value: 'O(1)', class: 'best' },
      { op: 'Insert (tail)', value: 'O(n)', class: 'avg' },
      { op: 'Delete', value: 'O(n)', class: 'avg' },
      { op: 'Search', value: 'O(n)', class: 'avg' }
    ]
  },
  tree: {
    badge: 'BST',
    analogy: 'Think of a family tree 🌳 — each person (node) can have children, and you navigate by going left or right based on comparisons!',
    title: 'Understanding Binary Tree',
    definition: {
      title: 'What is a Binary Tree?',
      text: 'A <strong>Binary Tree</strong> is a hierarchical data structure where each node has at most <strong>two children</strong> (left and right). A <strong>Binary Search Tree (BST)</strong> maintains order: left < parent < right.',
      points: [
        'Hierarchical structure with root',
        'Each node has max 2 children',
        'BST: Left < Parent < Right',
        'Used in: Databases, File systems, Expression parsing'
      ]
    },
    complexity: [
      { op: 'Insert', value: 'O(log n)', class: 'best' },
      { op: 'Search', value: 'O(log n)', class: 'best' },
      { op: 'Traverse', value: 'O(n)', class: 'avg' },
      { op: 'Space', value: 'O(n)', class: '' }
    ]
  },
  memory: {
    badge: 'HEAP',
    analogy: 'Think of memory as a parking lot 🅿️ — malloc reserves a spot, calloc reserves and cleans it, realloc moves to a bigger spot, and free releases it for others!',
    title: 'Understanding Memory Management',
    definition: {
      title: 'What is Dynamic Memory?',
      text: 'Dynamic Memory Management allows programs to request and release memory during runtime from the <strong>heap</strong>. Functions like <strong>malloc</strong>, <strong>calloc</strong>, <strong>realloc</strong>, and <strong>free</strong> manage this process in C.',
      points: [
        'malloc: Allocates uninitialized memory',
        'calloc: Allocates and initializes to zero',
        'realloc: Resizes previously allocated memory',
        'free: Releases allocated memory back to heap'
      ]
    },
    complexity: [
      { op: 'malloc', value: 'O(1)*', class: 'best' },
      { op: 'calloc', value: 'O(n)', class: 'avg' },
      { op: 'realloc', value: 'O(n)', class: 'avg' },
      { op: 'free', value: 'O(1)', class: 'best' }
    ]
  }
};

// Pseudocode templates
const PSEUDOCODE = {
  stack: {
    push: `<span class="keyword">function</span> <span class="function">push</span>(element):
    <span class="keyword">if</span> top >= MAX_SIZE - 1:
        <span class="keyword">return</span> <span class="string">"OVERFLOW ERROR"</span>
    top = top + 1
    stack[top] = element
    <span class="keyword">return</span> <span class="string">"SUCCESS"</span>`,
    pop: `<span class="keyword">function</span> <span class="function">pop</span>():
    <span class="keyword">if</span> top < 0:
        <span class="keyword">return</span> <span class="string">"UNDERFLOW ERROR"</span>
    element = stack[top]
    top = top - 1
    <span class="keyword">return</span> element`,
    peek: `<span class="keyword">function</span> <span class="function">peek</span>():
    <span class="keyword">if</span> top < 0:
        <span class="keyword">return</span> <span class="string">"Stack is Empty"</span>
    <span class="keyword">return</span> stack[top]
    <span class="comment">// Note: Element NOT removed</span>`
  },
  queue: {
    enqueue: `<span class="keyword">function</span> <span class="function">enqueue</span>(element):
    <span class="keyword">if</span> rear >= MAX_SIZE - 1:
        <span class="keyword">return</span> <span class="string">"OVERFLOW ERROR"</span>
    <span class="keyword">if</span> front == -1:
        front = 0
    rear = rear + 1
    queue[rear] = element`,
    dequeue: `<span class="keyword">function</span> <span class="function">dequeue</span>():
    <span class="keyword">if</span> front == -1 <span class="keyword">or</span> front > rear:
        <span class="keyword">return</span> <span class="string">"UNDERFLOW ERROR"</span>
    element = queue[front]
    front = front + 1
    <span class="keyword">return</span> element`
  },
  linkedlist: {
    insertHead: `<span class="keyword">function</span> <span class="function">insertAtHead</span>(value):
    newNode = <span class="keyword">new</span> Node(value)
    newNode.next = head
    head = newNode`,
    insertTail: `<span class="keyword">function</span> <span class="function">insertAtTail</span>(value):
    newNode = <span class="keyword">new</span> Node(value)
    <span class="keyword">if</span> head == null:
        head = newNode
        <span class="keyword">return</span>
    current = head
    <span class="keyword">while</span> current.next != null:
        current = current.next
    current.next = newNode`,
    delete: `<span class="keyword">function</span> <span class="function">deleteNode</span>(value):
    <span class="keyword">if</span> head == null:
        <span class="keyword">return</span> <span class="string">"List Empty"</span>
    <span class="keyword">if</span> head.data == value:
        head = head.next
        <span class="keyword">return</span>
    current = head
    <span class="keyword">while</span> current.next != null:
        <span class="keyword">if</span> current.next.data == value:
            current.next = current.next.next
            <span class="keyword">return</span>
        current = current.next`
  },
  tree: {
    insert: `<span class="keyword">function</span> <span class="function">insert</span>(root, value):
    <span class="keyword">if</span> root <span class="keyword">is</span> null:
        <span class="keyword">return</span> new Node(value)
    <span class="keyword">if</span> value < root.value:
        root.left = insert(root.left, value)
    <span class="keyword">else</span>:
        root.right = insert(root.right, value)
    <span class="keyword">return</span> root`,
    inorder: `<span class="keyword">function</span> <span class="function">inorder</span>(node):
    <span class="keyword">if</span> node <span class="keyword">is</span> null:
        <span class="keyword">return</span>
    inorder(node.left)   <span class="comment">// Visit left subtree</span>
    visit(node)          <span class="comment">// Process current</span>
    inorder(node.right)  <span class="comment">// Visit right subtree</span>`,
    preorder: `<span class="keyword">function</span> <span class="function">preorder</span>(node):
    <span class="keyword">if</span> node <span class="keyword">is</span> null:
        <span class="keyword">return</span>
    visit(node)           <span class="comment">// Process current FIRST</span>
    preorder(node.left)   <span class="comment">// Then left subtree</span>
    preorder(node.right)  <span class="comment">// Then right subtree</span>`,
    postorder: `<span class="keyword">function</span> <span class="function">postorder</span>(node):
    <span class="keyword">if</span> node <span class="keyword">is</span> null:
        <span class="keyword">return</span>
    postorder(node.left)   <span class="comment">// Visit left first</span>
    postorder(node.right)  <span class="comment">// Then right subtree</span>
    visit(node)            <span class="comment">// Process current LAST</span>`
  },
  memory: {
    malloc: `<span class="keyword">void</span>* <span class="function">malloc</span>(size_t size):
    <span class="comment">// Allocates 'size' bytes from heap</span>
    <span class="keyword">if</span> size == 0:
        <span class="keyword">return</span> NULL
    ptr = find_free_block(size)
    <span class="keyword">if</span> ptr == NULL:
        <span class="keyword">return</span> NULL  <span class="comment">// Out of memory</span>
    <span class="keyword">return</span> ptr
    <span class="comment">// Memory is UNINITIALIZED!</span>`,
    calloc: `<span class="keyword">void</span>* <span class="function">calloc</span>(size_t n, size_t size):
    <span class="comment">// Allocates n * size bytes, initialized to 0</span>
    total = n * size
    ptr = malloc(total)
    <span class="keyword">if</span> ptr != NULL:
        memset(ptr, 0, total)  <span class="comment">// Zero initialize</span>
    <span class="keyword">return</span> ptr`,
    realloc: `<span class="keyword">void</span>* <span class="function">realloc</span>(void* ptr, size_t new_size):
    <span class="comment">// Resize previously allocated block</span>
    <span class="keyword">if</span> ptr == NULL:
        <span class="keyword">return</span> malloc(new_size)
    <span class="keyword">if</span> new_size == 0:
        free(ptr)
        <span class="keyword">return</span> NULL
    new_ptr = malloc(new_size)
    copy_data(new_ptr, ptr, min(old_size, new_size))
    free(ptr)
    <span class="keyword">return</span> new_ptr`,
    free: `<span class="keyword">void</span> <span class="function">free</span>(void* ptr):
    <span class="comment">// Returns memory block to heap</span>
    <span class="keyword">if</span> ptr == NULL:
        <span class="keyword">return</span>  <span class="comment">// Safe to free NULL</span>
    mark_block_as_free(ptr)
    <span class="comment">// Merge with adjacent free blocks</span>
    coalesce_free_blocks()
    <span class="comment">// WARNING: ptr is now invalid!</span>`
  }
};

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
  currentView: 'stack',
  animationSpeed: CONFIG.DEFAULT_SPEED,
  isAutoPlay: true,
  isAnimating: false,
  
  // Data Structures
  stack: [],
  queue: [],
  linkedList: [],
  tree: null,
  memoryBlocks: [],  // Array of {id, size, address, name, initialized}
  nextMemoryId: 1,
  heapSize: 1024,    // Total heap size in bytes
  
  // History for undo/redo
  history: [],
  historyIndex: -1,
  operationLog: [],
  
  // Animation state
  currentSteps: [],
  currentStepIndex: 0
};

// ============================================
// DOM ELEMENTS
// ============================================

const DOM = {
  // Navigation
  mainNav: document.getElementById('main-nav'),
  navBtns: document.querySelectorAll('.nav-btn'),
  
  // Header controls
  speedSlider: document.getElementById('speed-slider'),
  speedValue: document.getElementById('speed-value'),
  toggleMode: document.getElementById('toggle-mode'),
  
  // Control panel
  dsBadge: document.getElementById('ds-badge'),
  controlContent: document.getElementById('control-content'),
  historyList: document.getElementById('history-list'),
  undoBtn: document.getElementById('undo-btn'),
  redoBtn: document.getElementById('redo-btn'),
  resetBtn: document.getElementById('reset-btn'),
  
  // Visualization
  analogyText: document.getElementById('analogy-text'),
  visualization: document.getElementById('visualization'),
  memoryGrid: document.getElementById('memory-grid'),
  statusSize: document.getElementById('status-size'),
  statusCapacity: document.getElementById('status-capacity'),
  toastText: document.getElementById('toast-text'),
  
  // Explanation panel
  conceptTitle: document.getElementById('concept-title'),
  definitionTitle: document.getElementById('definition-title'),
  definitionText: document.getElementById('definition-text'),
  keyPoints: document.getElementById('key-points'),
  pseudocode: document.getElementById('pseudocode'),
  narrationContent: document.getElementById('narration-content'),
  stepCounter: document.getElementById('step-counter'),
  prevStep: document.getElementById('prev-step'),
  nextStep: document.getElementById('next-step')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate animation duration based on speed setting
 */
function getAnimationDuration(baseDuration = CONFIG.ANIMATION_BASE_DURATION) {
  return baseDuration / state.animationSpeed;
}

/**
 * Delay helper for async animations
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms / state.animationSpeed));
}

/**
 * Generate random memory address
 */
function generateAddress() {
  return Math.floor(Math.random() * 9000 + 1000);
}

/**
 * Show toast notification
 */
function showToast(message, icon = '✨') {
  DOM.toastText.innerHTML = message;
  document.querySelector('.toast-icon').textContent = icon;
}

/**
 * Update pseudocode display
 */
function updatePseudocode(code) {
  DOM.pseudocode.innerHTML = `<code>${code}</code>`;
}

/**
 * Update narration steps
 */
function updateNarration(steps, currentIndex = 0) {
  state.currentSteps = steps;
  state.currentStepIndex = currentIndex;
  
  DOM.narrationContent.innerHTML = steps.map((step, i) => `
    <div class="narration-step ${i < currentIndex ? 'completed' : ''} ${i === currentIndex ? 'active' : ''}">
      <span class="step-number">${i + 1}</span>
      <span class="step-text">${step}</span>
    </div>
  `).join('');
  
  DOM.stepCounter.textContent = `Step ${currentIndex + 1}/${steps.length}`;
  DOM.prevStep.disabled = currentIndex === 0;
  DOM.nextStep.disabled = currentIndex >= steps.length - 1;
}

/**
 * Add operation to history
 */
function addToHistory(type, value) {
  const item = { type, value, timestamp: Date.now() };
  state.operationLog.unshift(item);
  
  if (state.operationLog.length > 10) {
    state.operationLog.pop();
  }
  
  renderHistory();
}

/**
 * Render operation history
 */
function renderHistory() {
  if (state.operationLog.length === 0) {
    DOM.historyList.innerHTML = '<div class="history-empty">No operations yet</div>';
    return;
  }
  
  DOM.historyList.innerHTML = state.operationLog.map(item => `
    <div class="history-item">
      <span class="op-type ${item.type.toLowerCase()}">${item.type}</span>
      <span class="op-value">${item.value}</span>
    </div>
  `).join('');
}

/**
 * Update memory visualization
 */
function updateMemoryView(data, activeIndices = []) {
  const maxSize = CONFIG.STACK_MAX_SIZE;
  let html = '';
  
  for (let i = 0; i < maxSize; i++) {
    const value = data[i] !== undefined ? data[i] : '';
    const isActive = activeIndices.includes(i);
    html += `
      <div class="memory-cell ${isActive ? 'active' : ''} ${value !== '' ? 'highlight' : ''}">
        <span class="value">${value}</span>
        <span class="addr">[${i}]</span>
      </div>
    `;
  }
  
  DOM.memoryGrid.innerHTML = html;
}

/**
 * Update status bar
 */
function updateStatus(size, capacity) {
  DOM.statusSize.textContent = size;
  DOM.statusCapacity.textContent = capacity;
}

// ============================================
// VIEW INITIALIZATION
// ============================================

/**
 * Initialize a specific data structure view
 */
function initView(view) {
  state.currentView = view;
  const config = DS_CONFIG[view];
  
  // Update badge
  DOM.dsBadge.textContent = config.badge;
  
  // Update analogy
  DOM.analogyText.textContent = config.analogy;
  
  // Update concept panel
  DOM.conceptTitle.textContent = config.title;
  DOM.definitionTitle.textContent = config.definition.title;
  DOM.definitionText.innerHTML = config.definition.text;
  DOM.keyPoints.innerHTML = config.definition.points.map(p => 
    `<li><span class="point-icon">✓</span> ${p}</li>`
  ).join('');
  
  // Initialize control panel and visualization
  switch (view) {
    case 'stack':
      initStackView();
      break;
    case 'queue':
      initQueueView();
      break;
    case 'linkedlist':
      initLinkedListView();
      break;
    case 'tree':
      initTreeView();
      break;
    case 'memory':
      initMemoryView();
      break;
  }
  
  // Reset narration
  updateNarration(['Select an operation to begin learning!']);
}

// ============================================
// STACK IMPLEMENTATION
// ============================================

function initStackView() {
  // Control panel
  DOM.controlContent.innerHTML = `
    <div class="control-group">
      <label>Push Value</label>
      <input type="text" class="control-input" id="stack-input" placeholder="Enter value (e.g., 42)" maxlength="4">
    </div>
    <div class="btn-group">
      <button class="btn btn-primary btn-block" id="push-btn">
        ⬇️ Push
      </button>
    </div>
    <div class="btn-group" style="margin-top: 12px;">
      <button class="btn btn-danger" id="pop-btn" style="flex: 1;">
        ⬆️ Pop
      </button>
      <button class="btn btn-secondary" id="peek-btn" style="flex: 1;">
        👁️ Peek
      </button>
    </div>
  `;
  
  // Event listeners
  document.getElementById('push-btn').addEventListener('click', stackPush);
  document.getElementById('pop-btn').addEventListener('click', stackPop);
  document.getElementById('peek-btn').addEventListener('click', stackPeek);
  document.getElementById('stack-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') stackPush();
  });
  
  // Initial render
  renderStack();
  updatePseudocode(PSEUDOCODE.stack.push);
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  updateMemoryView(state.stack);
}

function renderStack(highlightIndex = -1, animationClass = '') {
  const isEmpty = state.stack.length === 0;
  
  let elementsHtml = '';
  state.stack.forEach((value, index) => {
    const isTop = index === state.stack.length - 1;
    const isHighlight = index === highlightIndex;
    elementsHtml += `
      <div class="stack-element ${isTop ? 'top' : ''} ${isHighlight ? animationClass : ''}" data-index="${index}">
        ${value}
      </div>
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="stack-container">
      <div class="stack-visual">
        ${isEmpty ? '<span class="stack-empty-label">Stack is empty</span>' : ''}
        ${elementsHtml}
        <div class="stack-base"></div>
      </div>
    </div>
  `;
}

async function stackPush() {
  if (state.isAnimating) return;
  
  const input = document.getElementById('stack-input');
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value to push!', '⚠️');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
    return;
  }
  
  if (state.stack.length >= CONFIG.STACK_MAX_SIZE) {
    // Overflow animation
    showToast('<strong>OVERFLOW!</strong> Stack is full. Cannot push more elements.', '🚫');
    updatePseudocode(PSEUDOCODE.stack.push);
    updateNarration([
      'Checking if stack has space...',
      `top (${state.stack.length - 1}) >= MAX_SIZE - 1 (${CONFIG.STACK_MAX_SIZE - 1})`,
      '<strong style="color: var(--danger)">OVERFLOW ERROR!</strong> Stack is full!',
      'The push operation is rejected to prevent data loss.'
    ], 2);
    
    DOM.visualization.querySelector('.stack-visual').classList.add('error-state');
    await delay(1000);
    DOM.visualization.querySelector('.stack-visual').classList.remove('error-state');
    return;
  }
  
  state.isAnimating = true;
  
  // Narration steps
  const steps = [
    `Attempting to push value "<strong>${value}</strong>" onto the stack...`,
    `Checking overflow: top (${state.stack.length - 1}) < MAX_SIZE - 1 (${CONFIG.STACK_MAX_SIZE - 1}) ✓`,
    `Incrementing top: top = ${state.stack.length - 1} + 1 = <strong>${state.stack.length}</strong>`,
    `Storing value: stack[${state.stack.length}] = "${value}"`,
    `<strong style="color: var(--success)">SUCCESS!</strong> Element pushed onto the stack.`
  ];
  
  updatePseudocode(PSEUDOCODE.stack.push);
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i === 3) {
      // Add element with animation
      state.stack.push(value);
      renderStack(state.stack.length - 1, 'pushing');
      updateMemoryView(state.stack, [state.stack.length - 1]);
    }
    
    await delay(600);
  }
  
  showToast(`Pushed "<strong>${value}</strong>" onto the stack. New size: ${state.stack.length}`, '✅');
  addToHistory('PUSH', value);
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  
  input.value = '';
  state.isAnimating = false;
}

async function stackPop() {
  if (state.isAnimating) return;
  
  if (state.stack.length === 0) {
    showToast('<strong>UNDERFLOW!</strong> Stack is empty. Nothing to pop.', '⚠️');
    updatePseudocode(PSEUDOCODE.stack.pop);
    updateNarration([
      'Attempting to pop from the stack...',
      'Checking if stack is empty: top < 0',
      '<strong style="color: var(--warning)">UNDERFLOW ERROR!</strong> Stack is empty!',
      'Cannot remove element from an empty stack.'
    ], 2);
    return;
  }
  
  state.isAnimating = true;
  const value = state.stack[state.stack.length - 1];
  
  const steps = [
    `Attempting to pop element from the stack...`,
    `Checking underflow: top (${state.stack.length - 1}) >= 0 ✓`,
    `Retrieving value: element = stack[${state.stack.length - 1}] = "<strong>${value}</strong>"`,
    `Decrementing top: top = ${state.stack.length - 1} - 1 = <strong>${state.stack.length - 2}</strong>`,
    `<strong style="color: var(--success)">SUCCESS!</strong> Element "${value}" popped from stack.`
  ];
  
  updatePseudocode(PSEUDOCODE.stack.pop);
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i === 2) {
      // Highlight element being popped
      renderStack(state.stack.length - 1, 'peeking');
    }
    
    if (i === 3) {
      // Animate pop
      renderStack(state.stack.length - 1, 'popping');
      await delay(500);
      state.stack.pop();
      renderStack();
      updateMemoryView(state.stack);
    }
    
    await delay(600);
  }
  
  showToast(`Popped "<strong>${value}</strong>" from the stack. New size: ${state.stack.length}`, '✅');
  addToHistory('POP', value);
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  
  state.isAnimating = false;
}

async function stackPeek() {
  if (state.isAnimating) return;
  
  if (state.stack.length === 0) {
    showToast('Stack is empty. Nothing to peek!', '⚠️');
    updateNarration([
      'Attempting to peek at top element...',
      'Checking if stack is empty: top < 0',
      '<strong style="color: var(--warning)">Stack is EMPTY!</strong>',
      'No element to peek at.'
    ], 2);
    return;
  }
  
  state.isAnimating = true;
  const value = state.stack[state.stack.length - 1];
  
  const steps = [
    'Peeking at the top element...',
    `Checking stack: top = ${state.stack.length - 1} ≥ 0 ✓`,
    `Reading value: stack[${state.stack.length - 1}] = "<strong>${value}</strong>"`,
    '<strong style="color: var(--info)">Note:</strong> Element is NOT removed from stack!',
    `<strong style="color: var(--success)">PEEK COMPLETE!</strong> Top element is "${value}".`
  ];
  
  updatePseudocode(PSEUDOCODE.stack.peek);
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i === 2) {
      renderStack(state.stack.length - 1, 'peeking');
    }
    
    await delay(700);
  }
  
  showToast(`Top element is "<strong>${value}</strong>" (not removed)`, '👁️');
  addToHistory('PEEK', value);
  
  // Reset animation
  renderStack();
  state.isAnimating = false;
}

// ============================================
// QUEUE IMPLEMENTATION
// ============================================

function initQueueView() {
  DOM.controlContent.innerHTML = `
    <div class="control-group">
      <label>Enqueue Value</label>
      <input type="text" class="control-input" id="queue-input" placeholder="Enter value (e.g., 42)" maxlength="4">
    </div>
    <div class="btn-group">
      <button class="btn btn-primary btn-block" id="enqueue-btn">
        ➡️ Enqueue
      </button>
    </div>
    <div class="btn-group" style="margin-top: 12px;">
      <button class="btn btn-danger btn-block" id="dequeue-btn">
        ⬅️ Dequeue
      </button>
    </div>
  `;
  
  document.getElementById('enqueue-btn').addEventListener('click', queueEnqueue);
  document.getElementById('dequeue-btn').addEventListener('click', queueDequeue);
  document.getElementById('queue-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') queueEnqueue();
  });
  
  renderQueue();
  updatePseudocode(PSEUDOCODE.queue.enqueue);
  updateStatus(state.queue.length, CONFIG.QUEUE_MAX_SIZE);
  updateMemoryView(state.queue);
}

function renderQueue(highlightIndex = -1, animationClass = '') {
  const isEmpty = state.queue.length === 0;
  
  let elementsHtml = '';
  state.queue.forEach((value, index) => {
    const isFront = index === 0;
    const isRear = index === state.queue.length - 1;
    const isHighlight = index === highlightIndex;
    
    elementsHtml += `
      <div class="queue-element ${isFront ? 'front' : ''} ${isRear ? 'rear' : ''} ${isHighlight ? animationClass : ''}" data-index="${index}">
        ${value}
        ${isFront ? '<span class="queue-pointer front-ptr">FRONT</span>' : ''}
        ${isRear && !isFront ? '<span class="queue-pointer rear-ptr">REAR</span>' : ''}
        ${isFront && isRear ? '<span class="queue-pointer front-ptr" style="background: var(--warning);">FRONT/REAR</span>' : ''}
      </div>
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="queue-container">
      <div class="queue-visual">
        <div class="queue-arrow left">OUT ←</div>
        ${isEmpty ? '<span class="queue-empty-label">Queue is empty</span>' : elementsHtml}
        <div class="queue-arrow right">→ IN</div>
      </div>
    </div>
  `;
}

async function queueEnqueue() {
  if (state.isAnimating) return;
  
  const input = document.getElementById('queue-input');
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value to enqueue!', '⚠️');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
    return;
  }
  
  if (state.queue.length >= CONFIG.QUEUE_MAX_SIZE) {
    showToast('<strong>OVERFLOW!</strong> Queue is full. Cannot enqueue more elements.', '🚫');
    updateNarration([
      'Checking if queue has space...',
      `rear (${state.queue.length - 1}) >= MAX_SIZE - 1 (${CONFIG.QUEUE_MAX_SIZE - 1})`,
      '<strong style="color: var(--danger)">OVERFLOW ERROR!</strong> Queue is full!',
      'The enqueue operation is rejected.'
    ], 2);
    return;
  }
  
  state.isAnimating = true;
  
  const steps = [
    `Attempting to enqueue value "<strong>${value}</strong>"...`,
    `Checking overflow: rear (${state.queue.length - 1}) < MAX_SIZE - 1 ✓`,
    state.queue.length === 0 ? 'Queue was empty, setting front = 0' : 'Front pointer remains at 0',
    `Incrementing rear: rear = ${state.queue.length - 1} + 1 = <strong>${state.queue.length}</strong>`,
    `Storing value: queue[${state.queue.length}] = "${value}"`,
    `<strong style="color: var(--success)">SUCCESS!</strong> Element enqueued at the rear.`
  ];
  
  updatePseudocode(PSEUDOCODE.queue.enqueue);
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i === 4) {
      state.queue.push(value);
      renderQueue(state.queue.length - 1, 'enqueueing');
      updateMemoryView(state.queue, [state.queue.length - 1]);
    }
    
    await delay(600);
  }
  
  showToast(`Enqueued "<strong>${value}</strong>" at rear. Size: ${state.queue.length}`, '✅');
  addToHistory('ENQUEUE', value);
  updateStatus(state.queue.length, CONFIG.QUEUE_MAX_SIZE);
  
  input.value = '';
  state.isAnimating = false;
}

async function queueDequeue() {
  if (state.isAnimating) return;
  
  if (state.queue.length === 0) {
    showToast('<strong>UNDERFLOW!</strong> Queue is empty. Nothing to dequeue.', '⚠️');
    updateNarration([
      'Attempting to dequeue from the queue...',
      'Checking if queue is empty...',
      '<strong style="color: var(--warning)">UNDERFLOW ERROR!</strong> Queue is empty!',
      'Cannot remove element from an empty queue.'
    ], 2);
    return;
  }
  
  state.isAnimating = true;
  const value = state.queue[0];
  
  const steps = [
    'Attempting to dequeue from the front...',
    'Checking underflow: front ≤ rear ✓',
    `Retrieving value: element = queue[0] = "<strong>${value}</strong>"`,
    `Incrementing front pointer (element removed from front)`,
    `<strong style="color: var(--success)">SUCCESS!</strong> Element "${value}" dequeued.`
  ];
  
  updatePseudocode(PSEUDOCODE.queue.dequeue);
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i === 2) {
      renderQueue(0, 'dequeueing');
    }
    
    if (i === 3) {
      await delay(500);
      state.queue.shift();
      renderQueue();
      updateMemoryView(state.queue);
    }
    
    await delay(600);
  }
  
  showToast(`Dequeued "<strong>${value}</strong>" from front. Size: ${state.queue.length}`, '✅');
  addToHistory('DEQUEUE', value);
  updateStatus(state.queue.length, CONFIG.QUEUE_MAX_SIZE);
  
  state.isAnimating = false;
}

// ============================================
// LINKED LIST IMPLEMENTATION
// ============================================

function initLinkedListView() {
  DOM.controlContent.innerHTML = `
    <div class="control-group">
      <label>Value</label>
      <input type="text" class="control-input" id="ll-input" placeholder="Enter value" maxlength="4">
    </div>
    <div class="control-group">
      <label>Insert Position</label>
      <select class="position-select" id="ll-position">
        <option value="head">At Head (Beginning)</option>
        <option value="tail">At Tail (End)</option>
      </select>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary btn-block" id="ll-insert-btn">
        ➕ Insert Node
      </button>
    </div>
    <div class="btn-group" style="margin-top: 12px;">
      <button class="btn btn-danger" id="ll-delete-head-btn" style="flex: 1;">
        🗑 Delete Head
      </button>
      <button class="btn btn-secondary" id="ll-traverse-btn" style="flex: 1;">
        🔍 Traverse
      </button>
    </div>
  `;
  
  document.getElementById('ll-insert-btn').addEventListener('click', linkedListInsert);
  document.getElementById('ll-delete-head-btn').addEventListener('click', linkedListDeleteHead);
  document.getElementById('ll-traverse-btn').addEventListener('click', linkedListTraverse);
  
  renderLinkedList();
  updatePseudocode(PSEUDOCODE.linkedlist.insertHead);
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
}

function renderLinkedList(currentIndex = -1, animationClass = '') {
  const isEmpty = state.linkedList.length === 0;
  
  if (isEmpty) {
    DOM.visualization.innerHTML = `
      <div class="linkedlist-container">
        <div class="linkedlist-visual">
          <div class="ll-node head">
            <span class="ll-head-label">HEAD</span>
            <div class="ll-null">NULL</div>
          </div>
        </div>
      </div>
    `;
    return;
  }
  
  let nodesHtml = '';
  state.linkedList.forEach((node, index) => {
    const isHead = index === 0;
    const isCurrent = index === currentIndex;
    const isLast = index === state.linkedList.length - 1;
    
    nodesHtml += `
      <div class="ll-node ${isHead ? 'head' : ''} ${isCurrent ? 'current ' + animationClass : ''}" data-index="${index}">
        ${isHead ? '<span class="ll-head-label">HEAD</span>' : ''}
        <div class="ll-node-box">
          <div class="ll-data">${node.value}</div>
          <div class="ll-next">${isLast ? 'NULL' : '●→'}</div>
        </div>
        <span class="ll-address">${node.address}</span>
      </div>
      ${!isLast ? '<div class="ll-arrow"></div>' : ''}
    `;
  });
  
  nodesHtml += `
    <div class="ll-null">NULL</div>
  `;
  
  DOM.visualization.innerHTML = `
    <div class="linkedlist-container">
      <div class="linkedlist-visual">
        ${nodesHtml}
      </div>
    </div>
  `;
}

async function linkedListInsert() {
  if (state.isAnimating) return;
  
  const input = document.getElementById('ll-input');
  const position = document.getElementById('ll-position').value;
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value!', '⚠️');
    return;
  }
  
  if (state.linkedList.length >= CONFIG.LINKEDLIST_MAX_SIZE) {
    showToast('Linked list is at maximum size!', '🚫');
    return;
  }
  
  state.isAnimating = true;
  const newNode = { value, address: generateAddress() };
  
  if (position === 'head') {
    updatePseudocode(PSEUDOCODE.linkedlist.insertHead);
    
    const steps = [
      `Creating new node with value "<strong>${value}</strong>"`,
      `Allocating memory at address <strong>${newNode.address}</strong>`,
      'Setting newNode.next = head (pointing to current first node)',
      'Updating head = newNode (new node becomes the head)',
      `<strong style="color: var(--success)">SUCCESS!</strong> Node inserted at head.`
    ];
    
    for (let i = 0; i < steps.length; i++) {
      updateNarration(steps, i);
      
      if (i === 3) {
        state.linkedList.unshift(newNode);
        renderLinkedList(0, 'inserting');
      }
      
      await delay(700);
    }
  } else {
    updatePseudocode(PSEUDOCODE.linkedlist.insertTail);
    
    const steps = [
      `Creating new node with value "<strong>${value}</strong>"`,
      `Allocating memory at address <strong>${newNode.address}</strong>`,
      state.linkedList.length === 0 
        ? 'List is empty, new node becomes head'
        : 'Traversing to the last node...',
      state.linkedList.length === 0
        ? 'Setting head = newNode'
        : 'Setting lastNode.next = newNode',
      `<strong style="color: var(--success)">SUCCESS!</strong> Node inserted at tail.`
    ];
    
    for (let i = 0; i < steps.length; i++) {
      updateNarration(steps, i);
      
      if (i === 2 && state.linkedList.length > 0) {
        // Animate traversal
        for (let j = 0; j < state.linkedList.length; j++) {
          renderLinkedList(j);
          await delay(400);
        }
      }
      
      if (i === 3) {
        state.linkedList.push(newNode);
        renderLinkedList(state.linkedList.length - 1, 'inserting');
      }
      
      await delay(700);
    }
  }
  
  showToast(`Inserted "<strong>${value}</strong>" at ${position}`, '✅');
  addToHistory('INSERT', value);
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
  
  input.value = '';
  state.isAnimating = false;
}

async function linkedListDeleteHead() {
  if (state.isAnimating) return;
  
  if (state.linkedList.length === 0) {
    showToast('List is empty!', '⚠️');
    return;
  }
  
  state.isAnimating = true;
  const value = state.linkedList[0].value;
  
  const steps = [
    'Checking if list is empty...',
    `List is not empty. Head value: "<strong>${value}</strong>"`,
    'Saving reference to head node',
    'Setting head = head.next',
    `<strong style="color: var(--success)">SUCCESS!</strong> Head node deleted.`
  ];
  
  updatePseudocode(PSEUDOCODE.linkedlist.delete);
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i === 2) {
      renderLinkedList(0, 'deleting');
    }
    
    if (i === 3) {
      await delay(500);
      state.linkedList.shift();
      renderLinkedList();
    }
    
    await delay(600);
  }
  
  showToast(`Deleted head node with value "<strong>${value}</strong>"`, '✅');
  addToHistory('DELETE', value);
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
  
  state.isAnimating = false;
}

async function linkedListTraverse() {
  if (state.isAnimating) return;
  
  if (state.linkedList.length === 0) {
    showToast('List is empty! Nothing to traverse.', '⚠️');
    return;
  }
  
  state.isAnimating = true;
  
  const steps = ['Starting traversal from HEAD...'];
  state.linkedList.forEach((node, i) => {
    steps.push(`Visiting node ${i}: value = "<strong>${node.value}</strong>", address = ${node.address}`);
  });
  steps.push('Reached NULL. <strong style="color: var(--success)">Traversal complete!</strong>');
  
  for (let i = 0; i < steps.length; i++) {
    updateNarration(steps, i);
    
    if (i > 0 && i <= state.linkedList.length) {
      renderLinkedList(i - 1);
    }
    
    await delay(800);
  }
  
  renderLinkedList();
  showToast(`Traversed ${state.linkedList.length} nodes`, '✅');
  
  state.isAnimating = false;
}

// ============================================
// BINARY TREE IMPLEMENTATION
// ============================================

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function initTreeView() {
  DOM.controlContent.innerHTML = `
    <div class="control-group">
      <label>Node Value</label>
      <input type="number" class="control-input" id="tree-input" placeholder="Enter number" min="0" max="999">
    </div>
    <div class="btn-group">
      <button class="btn btn-primary btn-block" id="tree-insert-btn">
        ➕ Insert
      </button>
    </div>
    <div class="control-group" style="margin-top: 16px;">
      <label>Traversal Type</label>
      <div class="radio-group">
        <label class="radio-option selected" data-traversal="inorder">
          <input type="radio" name="traversal" value="inorder" checked>
          Inorder
        </label>
        <label class="radio-option" data-traversal="preorder">
          <input type="radio" name="traversal" value="preorder">
          Preorder
        </label>
        <label class="radio-option" data-traversal="postorder">
          <input type="radio" name="traversal" value="postorder">
          Postorder
        </label>
      </div>
    </div>
    <div class="btn-group" style="margin-top: 12px;">
      <button class="btn btn-secondary btn-block" id="tree-traverse-btn">
        🔍 Start Traversal
      </button>
    </div>
    <div class="btn-group" style="margin-top: 12px;">
      <button class="btn btn-danger btn-block" id="tree-clear-btn">
        🗑 Clear Tree
      </button>
    </div>
  `;
  
  document.getElementById('tree-insert-btn').addEventListener('click', treeInsert);
  document.getElementById('tree-traverse-btn').addEventListener('click', treeTraverse);
  document.getElementById('tree-clear-btn').addEventListener('click', treeClear);
  
  // Radio button selection
  document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      option.querySelector('input').checked = true;
      
      const type = option.dataset.traversal;
      updatePseudocode(PSEUDOCODE.tree[type]);
    });
  });
  
  renderTree();
  updatePseudocode(PSEUDOCODE.tree.insert);
  updateStatus(countTreeNodes(state.tree), CONFIG.TREE_MAX_SIZE);
}

function countTreeNodes(node) {
  if (!node) return 0;
  return 1 + countTreeNodes(node.left) + countTreeNodes(node.right);
}

function getTreeHeight(node) {
  if (!node) return 0;
  return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

function renderTree(highlightValue = null, visitedValues = []) {
  if (!state.tree) {
    DOM.visualization.innerHTML = `
      <div class="tree-container">
        <div class="tree-visual">
          <span class="tree-empty-label">Tree is empty. Insert a node to begin!</span>
        </div>
      </div>
    `;
    return;
  }
  
  const containerWidth = DOM.visualization.offsetWidth || 800;
  const containerHeight = DOM.visualization.offsetHeight || 400;
  
  // Calculate positions for each node
  const positions = [];
  const edges = [];
  
  function calculatePositions(node, x, y, level, xOffset) {
    if (!node) return;
    
    positions.push({
      value: node.value,
      x: x,
      y: y,
      isRoot: level === 0,
      isCurrent: node.value === highlightValue,
      isVisited: visitedValues.includes(node.value)
    });
    
    const nextOffset = xOffset / 2;
    const verticalGap = 80;
    
    if (node.left) {
      edges.push({ x1: x, y1: y, x2: x - nextOffset, y2: y + verticalGap });
      calculatePositions(node.left, x - nextOffset, y + verticalGap, level + 1, nextOffset);
    }
    
    if (node.right) {
      edges.push({ x1: x, y1: y, x2: x + nextOffset, y2: y + verticalGap });
      calculatePositions(node.right, x + nextOffset, y + verticalGap, level + 1, nextOffset);
    }
  }
  
  const startX = containerWidth / 2;
  const startY = 60;
  const initialOffset = Math.min(containerWidth / 4, 150);
  
  calculatePositions(state.tree, startX, startY, 0, initialOffset);
  
  // Render SVG edges
  const edgesHtml = edges.map(e => 
    `<line class="tree-edge" x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}"/>`
  ).join('');
  
  // Render nodes
  const nodesHtml = positions.map(p => `
    <div class="tree-node ${p.isRoot ? 'root' : ''} ${p.isCurrent ? 'current' : ''} ${p.isVisited ? 'visited' : ''}"
         style="left: ${p.x}px; top: ${p.y}px;">
      ${p.value}
      ${p.isRoot ? '<span class="tree-node-label">ROOT</span>' : ''}
    </div>
  `).join('');
  
  DOM.visualization.innerHTML = `
    <div class="tree-container">
      <div class="tree-visual">
        <svg class="tree-svg">${edgesHtml}</svg>
        ${nodesHtml}
      </div>
    </div>
  `;
}

function insertIntoBST(root, value) {
  if (!root) {
    return new TreeNode(value);
  }
  
  if (value < root.value) {
    root.left = insertIntoBST(root.left, value);
  } else {
    root.right = insertIntoBST(root.right, value);
  }
  
  return root;
}

async function treeInsert() {
  if (state.isAnimating) return;
  
  const input = document.getElementById('tree-input');
  const value = parseInt(input.value);
  
  if (isNaN(value)) {
    showToast('Please enter a valid number!', '⚠️');
    return;
  }
  
  if (countTreeNodes(state.tree) >= CONFIG.TREE_MAX_SIZE) {
    showToast('Tree is at maximum size!', '🚫');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.tree.insert);
  
  if (!state.tree) {
    const steps = [
      `Inserting value <strong>${value}</strong> into empty tree...`,
      'Tree is empty (root == null)',
      `Creating new node with value ${value}`,
      `Setting root = new Node(${value})`,
      `<strong style="color: var(--success)">SUCCESS!</strong> ${value} is now the root!`
    ];
    
    for (let i = 0; i < steps.length; i++) {
      updateNarration(steps, i);
      
      if (i === 3) {
        state.tree = new TreeNode(value);
        renderTree(value);
      }
      
      await delay(600);
    }
  } else {
    const path = [];
    let current = state.tree;
    
    // Find insertion path
    while (current) {
      path.push({ node: current, direction: value < current.value ? 'left' : 'right' });
      if (value < current.value) {
        if (!current.left) break;
        current = current.left;
      } else {
        if (!current.right) break;
        current = current.right;
      }
    }
    
    const steps = [
      `Inserting value <strong>${value}</strong>...`,
      `Starting at root (${state.tree.value})`,
    ];
    
    path.forEach((p, i) => {
      const comparison = value < p.node.value ? '<' : '≥';
      const direction = p.direction === 'left' ? 'LEFT' : 'RIGHT';
      steps.push(`${value} ${comparison} ${p.node.value} → Go ${direction}`);
    });
    
    steps.push(`Found empty spot! Inserting ${value}`);
    steps.push(`<strong style="color: var(--success)">SUCCESS!</strong> Node inserted!`);
    
    for (let i = 0; i < steps.length; i++) {
      updateNarration(steps, i);
      
      if (i >= 2 && i < 2 + path.length) {
        renderTree(path[i - 2].node.value);
        await delay(600);
      }
      
      if (i === steps.length - 2) {
        state.tree = insertIntoBST(state.tree, value);
        renderTree(value);
      }
      
      await delay(500);
    }
  }
  
  showToast(`Inserted <strong>${value}</strong> into the tree`, '✅');
  addToHistory('INSERT', value);
  updateStatus(countTreeNodes(state.tree), CONFIG.TREE_MAX_SIZE);
  
  input.value = '';
  state.isAnimating = false;
}

async function treeTraverse() {
  if (state.isAnimating) return;
  
  if (!state.tree) {
    showToast('Tree is empty!', '⚠️');
    return;
  }
  
  state.isAnimating = true;
  
  const traversalType = document.querySelector('input[name="traversal"]:checked').value;
  updatePseudocode(PSEUDOCODE.tree[traversalType]);
  
  const result = [];
  const visited = [];
  
  async function inorder(node) {
    if (!node) return;
    await inorder(node.left);
    visited.push(node.value);
    result.push(node.value);
    renderTree(node.value, [...visited]);
    await delay(700);
    await inorder(node.right);
  }
  
  async function preorder(node) {
    if (!node) return;
    visited.push(node.value);
    result.push(node.value);
    renderTree(node.value, [...visited]);
    await delay(700);
    await preorder(node.left);
    await preorder(node.right);
  }
  
  async function postorder(node) {
    if (!node) return;
    await postorder(node.left);
    await postorder(node.right);
    visited.push(node.value);
    result.push(node.value);
    renderTree(node.value, [...visited]);
    await delay(700);
  }
  
  const steps = [
    `Starting <strong>${traversalType.toUpperCase()}</strong> traversal...`,
    traversalType === 'inorder' ? 'Order: Left → Root → Right (Gives sorted order!)' :
    traversalType === 'preorder' ? 'Order: Root → Left → Right (Good for copying tree)' :
    'Order: Left → Right → Root (Good for deletion)',
    'Traversing...'
  ];
  
  updateNarration(steps, 0);
  await delay(500);
  updateNarration(steps, 1);
  await delay(500);
  updateNarration(steps, 2);
  
  switch (traversalType) {
    case 'inorder':
      await inorder(state.tree);
      break;
    case 'preorder':
      await preorder(state.tree);
      break;
    case 'postorder':
      await postorder(state.tree);
      break;
  }
  
  updateNarration([
    ...steps,
    `<strong style="color: var(--success)">COMPLETE!</strong> Result: [${result.join(', ')}]`
  ], 3);
  
  showToast(`${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} traversal: [${result.join(', ')}]`, '✅');
  renderTree();
  
  state.isAnimating = false;
}

function treeClear() {
  state.tree = null;
  renderTree();
  showToast('Tree cleared!', '🗑');
  updateStatus(0, CONFIG.TREE_MAX_SIZE);
  updateNarration(['Tree has been cleared. Insert a node to begin!']);
}

// ============================================
// MEMORY MANAGEMENT IMPLEMENTATION
// ============================================

function initMemoryView() {
  // Control panel
  DOM.controlContent.innerHTML = `
    <div class="control-group">
      <label>Variable Name</label>
      <input type="text" class="control-input" id="mem-name" placeholder="e.g., ptr, arr" maxlength="8">
    </div>
    <div class="control-group">
      <label>Size (bytes)</label>
      <input type="number" class="control-input" id="mem-size" placeholder="e.g., 4, 100" min="1" max="256">
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" id="malloc-btn" style="flex: 1;">
        📦 malloc
      </button>
      <button class="btn btn-secondary" id="calloc-btn" style="flex: 1;">
        🧹 calloc
      </button>
    </div>
    <div class="btn-group" style="margin-top: 12px;">
      <button class="btn btn-warning" id="realloc-btn" style="flex: 1;">
        🔄 realloc
      </button>
      <button class="btn btn-danger" id="free-btn" style="flex: 1;">
        🗑️ free
      </button>
    </div>
    <div class="control-group" style="margin-top: 16px;">
      <label>Select Block to Modify</label>
      <select class="control-input" id="mem-select">
        <option value="">-- Select a block --</option>
      </select>
    </div>
  `;
  
  // Event listeners
  document.getElementById('malloc-btn').addEventListener('click', memoryMalloc);
  document.getElementById('calloc-btn').addEventListener('click', memoryCalloc);
  document.getElementById('realloc-btn').addEventListener('click', memoryRealloc);
  document.getElementById('free-btn').addEventListener('click', memoryFree);
  
  // Initial render
  renderMemory();
  updatePseudocode(PSEUDOCODE.memory.malloc);
  updateMemorySelect();
  updateStatus(getTotalAllocated(), state.heapSize);
}

function getTotalAllocated() {
  return state.memoryBlocks.reduce((sum, block) => sum + block.size, 0);
}

function generateMemoryAddress() {
  return '0x' + (Math.floor(Math.random() * 0xFFFF) + 0x1000).toString(16).toUpperCase();
}

function updateMemorySelect() {
  const select = document.getElementById('mem-select');
  if (!select) return;
  
  select.innerHTML = '<option value="">-- Select a block --</option>' +
    state.memoryBlocks.map(block => 
      `<option value="${block.id}">${block.name} (${block.size} bytes) @ ${block.address}</option>`
    ).join('');
}

function renderMemory(highlightId = -1, animationClass = '') {
  const totalAllocated = getTotalAllocated();
  const freeSpace = state.heapSize - totalAllocated;
  
  let blocksHtml = '';
  state.memoryBlocks.forEach(block => {
    const isHighlight = block.id === highlightId;
    const widthPercent = Math.max((block.size / state.heapSize) * 100, 5);
    blocksHtml += `
      <div class="memory-block ${block.initialized ? 'initialized' : 'uninitialized'} ${isHighlight ? animationClass : ''}" 
           style="width: ${widthPercent}%;" data-id="${block.id}">
        <div class="block-header">
          <span class="block-name">${block.name}</span>
          <span class="block-address">${block.address}</span>
        </div>
        <div class="block-info">
          <span class="block-size">${block.size} B</span>
          <span class="block-status">${block.initialized ? '✓ Zero' : '? Garbage'}</span>
        </div>
      </div>
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="memory-container">
      <div class="heap-header">
        <h3>🧠 Heap Memory</h3>
        <div class="heap-stats">
          <span class="stat used">Used: ${totalAllocated}B</span>
          <span class="stat free">Free: ${freeSpace}B</span>
        </div>
      </div>
      <div class="heap-visual">
        <div class="heap-bar">
          ${blocksHtml}
          ${freeSpace > 0 ? `<div class="memory-block free-block" style="width: ${(freeSpace / state.heapSize) * 100}%;">
            <span class="free-label">FREE SPACE</span>
          </div>` : ''}
        </div>
      </div>
      <div class="memory-legend">
        <div class="legend-item"><span class="legend-color uninitialized"></span> Uninitialized (malloc)</div>
        <div class="legend-item"><span class="legend-color initialized"></span> Zero-initialized (calloc)</div>
        <div class="legend-item"><span class="legend-color free"></span> Free Space</div>
      </div>
      ${state.memoryBlocks.length === 0 ? '<div class="memory-empty">Heap is empty. Use malloc or calloc to allocate memory!</div>' : ''}
    </div>
  `;
  
  updateStatus(totalAllocated, state.heapSize);
}

async function memoryMalloc() {
  if (state.isAnimating) return;
  
  const nameInput = document.getElementById('mem-name');
  const sizeInput = document.getElementById('mem-size');
  const name = nameInput.value.trim() || `ptr${state.nextMemoryId}`;
  const size = parseInt(sizeInput.value) || 0;
  
  if (size <= 0 || size > 256) {
    showToast('Please enter a valid size (1-256 bytes)', '⚠️');
    return;
  }
  
  if (getTotalAllocated() + size > state.heapSize) {
    showToast('Not enough heap space! Memory allocation failed.', '❌');
    updateNarration([
      'malloc() called with size ' + size,
      'Checking available heap space...',
      'ERROR: Not enough contiguous memory!',
      'malloc() returns NULL (allocation failed)'
    ]);
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.malloc);
  
  const steps = [
    `Calling malloc(${size}) to allocate ${size} bytes`,
    'Searching for free block in heap...',
    'Found suitable block! Reserving memory...',
    `Memory allocated at address. Assigned to "${name}"`,
    '⚠️ Note: Memory is UNINITIALIZED (contains garbage values)'
  ];
  
  updateNarration(steps);
  await delay(300);
  
  const newBlock = {
    id: state.nextMemoryId++,
    name: name,
    size: size,
    address: generateMemoryAddress(),
    initialized: false
  };
  
  state.memoryBlocks.push(newBlock);
  renderMemory(newBlock.id, 'pop-in');
  updateMemorySelect();
  
  nameInput.value = '';
  sizeInput.value = '';
  
  addToHistory('MALLOC', `${name} (${size}B)`);
  showToast(`malloc: Allocated ${size} bytes for "${name}"`, '📦');
  
  state.isAnimating = false;
}

async function memoryCalloc() {
  if (state.isAnimating) return;
  
  const nameInput = document.getElementById('mem-name');
  const sizeInput = document.getElementById('mem-size');
  const name = nameInput.value.trim() || `arr${state.nextMemoryId}`;
  const size = parseInt(sizeInput.value) || 0;
  
  if (size <= 0 || size > 256) {
    showToast('Please enter a valid size (1-256 bytes)', '⚠️');
    return;
  }
  
  if (getTotalAllocated() + size > state.heapSize) {
    showToast('Not enough heap space! Memory allocation failed.', '❌');
    updateNarration([
      'calloc() called with size ' + size,
      'Checking available heap space...',
      'ERROR: Not enough contiguous memory!',
      'calloc() returns NULL (allocation failed)'
    ]);
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.calloc);
  
  const steps = [
    `Calling calloc(1, ${size}) to allocate ${size} bytes`,
    'Searching for free block in heap...',
    'Found suitable block! Reserving memory...',
    'Initializing all bytes to ZERO...',
    `Memory allocated and initialized. Assigned to "${name}"`,
    '✓ All bytes are set to 0 (safe to use immediately)'
  ];
  
  updateNarration(steps);
  await delay(300);
  
  const newBlock = {
    id: state.nextMemoryId++,
    name: name,
    size: size,
    address: generateMemoryAddress(),
    initialized: true
  };
  
  state.memoryBlocks.push(newBlock);
  renderMemory(newBlock.id, 'pop-in');
  updateMemorySelect();
  
  nameInput.value = '';
  sizeInput.value = '';
  
  addToHistory('CALLOC', `${name} (${size}B)`);
  showToast(`calloc: Allocated ${size} zero-initialized bytes for "${name}"`, '🧹');
  
  state.isAnimating = false;
}

async function memoryRealloc() {
  if (state.isAnimating) return;
  
  const select = document.getElementById('mem-select');
  const sizeInput = document.getElementById('mem-size');
  const blockId = parseInt(select.value);
  const newSize = parseInt(sizeInput.value) || 0;
  
  if (!blockId) {
    showToast('Please select a block to reallocate', '⚠️');
    return;
  }
  
  if (newSize <= 0 || newSize > 256) {
    showToast('Please enter a valid new size (1-256 bytes)', '⚠️');
    return;
  }
  
  const block = state.memoryBlocks.find(b => b.id === blockId);
  if (!block) {
    showToast('Block not found!', '❌');
    return;
  }
  
  const sizeDiff = newSize - block.size;
  if (sizeDiff > 0 && getTotalAllocated() + sizeDiff > state.heapSize) {
    showToast('Not enough heap space for reallocation!', '❌');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.realloc);
  
  const oldSize = block.size;
  const steps = [
    `Calling realloc(${block.name}, ${newSize})`,
    `Current block size: ${oldSize} bytes`,
    newSize > oldSize ? 'Need more space - allocating new block...' : 'Shrinking block...',
    newSize > oldSize ? 'Copying existing data to new location...' : 'Truncating data...',
    `Freeing old block at ${block.address}...`,
    `Reallocation complete! New size: ${newSize} bytes`
  ];
  
  updateNarration(steps);
  await delay(300);
  
  block.size = newSize;
  block.address = generateMemoryAddress(); // New address after realloc
  
  renderMemory(block.id, 'pulse');
  updateMemorySelect();
  
  sizeInput.value = '';
  
  addToHistory('REALLOC', `${block.name}: ${oldSize}B → ${newSize}B`);
  showToast(`realloc: Resized "${block.name}" from ${oldSize}B to ${newSize}B`, '🔄');
  
  state.isAnimating = false;
}

async function memoryFree() {
  if (state.isAnimating) return;
  
  const select = document.getElementById('mem-select');
  const blockId = parseInt(select.value);
  
  if (!blockId) {
    showToast('Please select a block to free', '⚠️');
    return;
  }
  
  const blockIndex = state.memoryBlocks.findIndex(b => b.id === blockId);
  if (blockIndex === -1) {
    showToast('Block not found!', '❌');
    return;
  }
  
  const block = state.memoryBlocks[blockIndex];
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.free);
  
  const steps = [
    `Calling free(${block.name})`,
    `Locating block at ${block.address}...`,
    `Marking ${block.size} bytes as free...`,
    'Returning memory to heap...',
    '✓ Memory freed successfully!',
    `⚠️ WARNING: "${block.name}" is now a dangling pointer!`
  ];
  
  updateNarration(steps);
  
  renderMemory(block.id, 'fade-out');
  await delay(500);
  
  state.memoryBlocks.splice(blockIndex, 1);
  renderMemory();
  updateMemorySelect();
  
  addToHistory('FREE', `${block.name} (${block.size}B)`);
  showToast(`free: Released ${block.size} bytes from "${block.name}"`, '🗑️');
  
  state.isAnimating = false;
}

// ============================================
// EVENT HANDLERS
// ============================================

// Navigation
DOM.navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (state.isAnimating) return;
    
    DOM.navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const view = btn.dataset.view;
    initView(view);
  });
});

// Speed control
DOM.speedSlider.addEventListener('input', (e) => {
  state.animationSpeed = parseFloat(e.target.value);
  DOM.speedValue.textContent = `${state.animationSpeed}x`;
});

// Toggle auto/step mode
DOM.toggleMode.addEventListener('click', () => {
  state.isAutoPlay = !state.isAutoPlay;
  const icon = document.getElementById('play-icon');
  if (state.isAutoPlay) {
    icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  } else {
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  }
  showToast(state.isAutoPlay ? 'Auto-play mode enabled' : 'Step-by-step mode enabled', '⚙️');
});

// Reset button
DOM.resetBtn.addEventListener('click', () => {
  if (state.isAnimating) return;
  
  state.stack = [];
  state.queue = [];
  state.linkedList = [];
  state.tree = null;
  state.operationLog = [];
  
  initView(state.currentView);
  renderHistory();
  showToast('All data structures reset!', '🗑');
});

// Step navigation
DOM.prevStep.addEventListener('click', () => {
  if (state.currentStepIndex > 0) {
    state.currentStepIndex--;
    updateNarration(state.currentSteps, state.currentStepIndex);
  }
});

DOM.nextStep.addEventListener('click', () => {
  if (state.currentStepIndex < state.currentSteps.length - 1) {
    state.currentStepIndex++;
    updateNarration(state.currentSteps, state.currentStepIndex);
  }
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize with Stack view
  initView('stack');
  
  // Welcome message
  showToast('Welcome! Select a data structure and start exploring. 🚀', '👋');
  
  console.log('%c Data Structures Visualized ', 
    'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
  console.log('Designed & Developed by Omkar Padashetty');
  console.log('Under Guidance of Dr. Pooja Aspalli Ma\'am');
});
