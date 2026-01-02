/**
 * ============================================
 * DATA STRUCTURES - WHITEBOARD STYLE
 * Interactive Classroom Learning Platform
 * ============================================
 * 
 * Hand-drawn, sketch-style visualization
 * for teaching data structures concepts.
 * 
 * Team: Nagaraj, Omkar, Prajwal
 * Guide: Dr. Pooja Aspalli Ma'am
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  STACK_MAX_SIZE: 8,
  QUEUE_MAX_SIZE: 8,
  LINKEDLIST_MAX_SIZE: 10,
  HEAP_SIZE: 512,
  ANIMATION_DURATION: 400
};

// Member/Topic Configuration
const MEMBERS = {
  nagaraj: {
    name: 'Nagaraj',
    topic: 'Memory Management',
    badge: 'HEAP',
    definition: {
      title: 'What is Memory Management?',
      text: 'Memory Management is how programs request, use, and release memory during runtime. In C, we use <strong>malloc</strong>, <strong>calloc</strong>, <strong>realloc</strong>, and <strong>free</strong> to manage heap memory.',
      points: [
        '→ malloc: allocate uninitialized memory',
        '→ calloc: allocate + initialize to zero',
        '→ realloc: resize existing allocation',
        '→ free: release memory back to heap'
      ]
    }
  },
  omkar: {
    name: 'Omkar',
    topic: 'Stack & Queue',
    badge: 'LIFO/FIFO',
    definition: {
      title: 'Stack & Queue Basics',
      text: '<strong>Stack</strong> follows LIFO (Last In, First Out) like a pile of books. <strong>Queue</strong> follows FIFO (First In, First Out) like a line of people.',
      points: [
        '→ Stack: Push/Pop at TOP only',
        '→ Queue: Enqueue at REAR, Dequeue from FRONT',
        '→ Both have O(1) time complexity',
        '→ Used in: function calls, scheduling, BFS'
      ]
    }
  },
  prajwal: {
    name: 'Prajwal',
    topic: 'Linked List',
    badge: 'NODES',
    definition: {
      title: 'What is a Linked List?',
      text: 'A <strong>Linked List</strong> is a chain of nodes where each node contains <strong>data</strong> and a <strong>pointer</strong> to the next node. Unlike arrays, elements are not stored contiguously.',
      points: [
        '→ Dynamic size - grows as needed',
        '→ Each node: data + next pointer',
        '→ HEAD points to first node',
        '→ Last node points to NULL'
      ]
    }
  }
};

// Pseudocode templates
const PSEUDOCODE = {
  stack: {
    push: `function push(element):
    if top >= MAX_SIZE - 1:
        return "OVERFLOW"
    top = top + 1
    stack[top] = element`,
    pop: `function pop():
    if top < 0:
        return "UNDERFLOW"
    element = stack[top]
    top = top - 1
    return element`
  },
  queue: {
    enqueue: `function enqueue(element):
    if rear >= MAX_SIZE - 1:
        return "OVERFLOW"
    rear = rear + 1
    queue[rear] = element`,
    dequeue: `function dequeue():
    if front > rear:
        return "UNDERFLOW"
    element = queue[front]
    front = front + 1
    return element`
  },
  linkedlist: {
    insert: `function insertAtHead(value):
    newNode = new Node(value)
    newNode.next = head
    head = newNode`,
    delete: `function deleteNode(value):
    if head.data == value:
        head = head.next
        return
    curr = head
    while curr.next != null:
        if curr.next.data == value:
            curr.next = curr.next.next
            return
        curr = curr.next`
  },
  memory: {
    malloc: `void* malloc(size_t size):
    // Allocates 'size' bytes
    // Memory is UNINITIALIZED
    ptr = find_free_block(size)
    return ptr`,
    calloc: `void* calloc(size_t n, size_t size):
    // Allocates n * size bytes
    // Memory is ZERO-INITIALIZED
    ptr = malloc(n * size)
    memset(ptr, 0, n * size)
    return ptr`,
    free: `void free(void* ptr):
    // Returns memory to heap
    mark_as_free(ptr)
    // ptr is now invalid!`
  }
};

// ============================================
// STATE
// ============================================

const state = {
  currentMember: 'omkar',
  currentSubView: 'stack', // stack, queue for omkar
  isAnimating: false,
  
  // Data
  stack: [],
  queue: [],
  linkedList: [],
  memoryBlocks: [],
  nextMemId: 1,
  
  // Steps
  currentSteps: [],
  currentStepIndex: 0
};

// ============================================
// DOM ELEMENTS
// ============================================

let DOM = {};

function initDOM() {
  DOM = {
    memberBtns: document.querySelectorAll('.member-btn'),
    topicLabel: document.getElementById('topic-label'),
    visualization: document.getElementById('visualization'),
    controlContent: document.getElementById('control-content'),
    
    // Notes panel
    conceptTitle: document.getElementById('concept-title'),
    definitionTitle: document.getElementById('definition-title'),
    definitionText: document.getElementById('definition-text'),
    keyPoints: document.getElementById('key-points'),
    pseudocode: document.getElementById('pseudocode'),
    narrationContent: document.getElementById('narration-content'),
    stepCounter: document.getElementById('step-counter'),
    prevStep: document.getElementById('prev-step'),
    nextStep: document.getElementById('next-step'),
    
    // Left panel definition
    leftDefinitionTitle: document.getElementById('left-definition-title'),
    leftDefinitionText: document.getElementById('left-definition-text'),
    
    // Status
    statusSize: document.getElementById('status-size'),
    statusCapacity: document.getElementById('status-capacity'),
    toastText: document.getElementById('toast-text'),
    
    // Memory display
    memTop: document.getElementById('mem-top'),
    memSize: document.getElementById('mem-size')
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showToast(message, icon = '💡') {
  if (DOM.toastText) DOM.toastText.innerHTML = `${icon} ${message}`;
}

// Stub for removed history feature
function addToHistory(operation, value) {
  // History feature removed - stub to prevent errors
  console.log(`${operation}: ${value}`);
}

function updateStatus(size, capacity) {
  if (DOM.statusSize) DOM.statusSize.textContent = size;
  if (DOM.statusCapacity) DOM.statusCapacity.textContent = capacity;
  // Update memory display
  if (DOM.memSize) DOM.memSize.textContent = size;
  if (DOM.memTop) DOM.memTop.textContent = size > 0 ? size - 1 : -1;
}

function updateNarration(steps, activeIndex = 0) {
  state.currentSteps = steps;
  state.currentStepIndex = activeIndex;
  
  if (DOM.stepCounter) DOM.stepCounter.textContent = `${activeIndex + 1}/${steps.length}`;
  if (DOM.narrationContent) {
    DOM.narrationContent.innerHTML = steps.map((step, i) => `
      <div class="step-item ${i === activeIndex ? 'active' : ''}">
        <span class="step-num">${i + 1}.</span>
        <span class="step-text">${step}</span>
      </div>
    `).join('');
  }
  
  if (DOM.prevStep) DOM.prevStep.disabled = activeIndex === 0;
  if (DOM.nextStep) DOM.nextStep.disabled = activeIndex >= steps.length - 1;
}

function updatePseudocode(code) {
  if (DOM.pseudocode) DOM.pseudocode.innerHTML = `<code>${code}</code>`;
}

// ============================================
// MEMBER/VIEW SWITCHING
// ============================================

function switchMember(member) {
  if (state.isAnimating) return;
  
  state.currentMember = member;
  const config = MEMBERS[member];
  
  // Update active button
  if (DOM.memberBtns) {
    DOM.memberBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.member === member);
    });
  }
  
  // Update topic label with fade
  if (DOM.topicLabel) {
    DOM.topicLabel.style.opacity = 0;
    setTimeout(() => {
      if (DOM.topicLabel) {
        DOM.topicLabel.textContent = config.topic;
        DOM.topicLabel.style.opacity = 1;
      }
    }, 200);
  }
  
  // Update notes panel (these elements may not exist anymore)
  if (DOM.conceptTitle) DOM.conceptTitle.textContent = config.topic + ' Notes';
  if (DOM.definitionTitle) DOM.definitionTitle.textContent = config.definition.title;
  if (DOM.definitionText) DOM.definitionText.innerHTML = config.definition.text;
  if (DOM.keyPoints) DOM.keyPoints.innerHTML = config.definition.points.map(p => `<li>${p}</li>`).join('');
  
  // Update left panel definition
  if (DOM.leftDefinitionTitle) {
    DOM.leftDefinitionTitle.textContent = config.definition.title;
  }
  if (DOM.leftDefinitionText) {
    DOM.leftDefinitionText.innerHTML = config.definition.text;
  }
  
  // Initialize view
  if (DOM.visualization) {
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
      if (DOM.visualization) {
        DOM.visualization.classList.remove('fade-out');
        DOM.visualization.classList.add('fade-in');
        setTimeout(() => {
          if (DOM.visualization) DOM.visualization.classList.remove('fade-in');
        }, 400);
      }
    }, 300);
  }
  
  updateNarration(['Select an operation to begin learning!']);
}

// ============================================
// OMKAR: STACK & QUEUE
// ============================================

function initStackQueueView() {
  // Controls
  if (!DOM.controlContent) return;
  
  DOM.controlContent.innerHTML = `
    <div class="view-toggle" style="margin-bottom: 12px;">
      <button class="sketch-btn ${state.currentSubView === 'stack' ? 'primary' : ''}" id="show-stack">Stack</button>
      <button class="sketch-btn ${state.currentSubView === 'queue' ? 'primary' : ''}" id="show-queue">Queue</button>
    </div>
    <input type="text" class="sketch-input" id="value-input" placeholder="Enter value..." maxlength="4">
    <div class="btn-row">
      <button class="sketch-btn success" id="add-btn">${state.currentSubView === 'stack' ? 'Push' : 'Enqueue'}</button>
      <button class="sketch-btn danger" id="remove-btn">${state.currentSubView === 'stack' ? 'Pop' : 'Dequeue'}</button>
    </div>
    <button class="sketch-btn" id="reset-btn" style="margin-top: 8px;">Clear All</button>
  `;
  
  // Event listeners with null checks
  const showStackBtn = document.getElementById('show-stack');
  const showQueueBtn = document.getElementById('show-queue');
  const addBtn = document.getElementById('add-btn');
  const removeBtn = document.getElementById('remove-btn');
  const resetBtn = document.getElementById('reset-btn');
  const valueInput = document.getElementById('value-input');
  
  if (showStackBtn) {
    showStackBtn.addEventListener('click', () => {
      state.currentSubView = 'stack';
      initStackQueueView();
    });
  }
  if (showQueueBtn) {
    showQueueBtn.addEventListener('click', () => {
      state.currentSubView = 'queue';
      initStackQueueView();
    });
  }
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      state.currentSubView === 'stack' ? stackPush() : queueEnqueue();
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      state.currentSubView === 'stack' ? stackPop() : queueDequeue();
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', resetStackQueue);
  }
  if (valueInput) {
    valueInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        state.currentSubView === 'stack' ? stackPush() : queueEnqueue();
      }
    });
  }
  
  // Render
  if (state.currentSubView === 'stack') {
    renderStack();
    updatePseudocode(PSEUDOCODE.stack.push);
    updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  } else {
    renderQueue();
    updatePseudocode(PSEUDOCODE.queue.enqueue);
    updateStatus(state.queue.length, CONFIG.QUEUE_MAX_SIZE);
  }
}

function renderStack(highlightIndex = -1, animClass = '') {
  if (!DOM.visualization) return;
  
  if (state.stack.length === 0) {
    DOM.visualization.innerHTML = `
      <div class="stack-sketch">
        <div class="stack-drawing">
          <div class="stack-empty">Stack is empty<br>Push something!</div>
        </div>
        <div class="stack-label">LIFO: Last In, First Out</div>
      </div>
    `;
    return;
  }
  
  let elements = '';
  state.stack.forEach((val, i) => {
    const isTop = i === state.stack.length - 1;
    const tilt = (Math.random() - 0.5) * 2;
    elements += `
      <div class="stack-element ${isTop ? 'top-element' : ''} ${i === highlightIndex ? animClass : ''}" 
           style="--tilt: ${tilt}">
        ${val}
      </div>
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="stack-sketch">
      <div class="stack-drawing">
        ${elements}
      </div>
      <div class="stack-label">LIFO: Last In, First Out</div>
    </div>
  `;
}

async function stackPush() {
  if (state.isAnimating) return;
  const input = document.getElementById('value-input');
  if (!input) return;
  
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value!', '⚠️');
    return;
  }
  
  if (state.stack.length >= CONFIG.STACK_MAX_SIZE) {
    showToast('Stack Overflow! Cannot push.', '❌');
    updateNarration(['OVERFLOW: Stack is full!', 'Cannot add more elements.', 'Max size reached.']);
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.stack.push);
  
  const steps = [
    `Pushing "${value}" onto the stack...`,
    'Checking if stack is full...',
    'Incrementing TOP pointer...',
    `Placing "${value}" at TOP position`,
    '✓ Push complete!'
  ];
  updateNarration(steps);
  
  state.stack.push(value);
  input.value = '';
  
  renderStack(state.stack.length - 1, 'pop-in');
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  addToHistory('PUSH', value);
  showToast(`Pushed "${value}" onto stack`, '📥');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function stackPop() {
  if (state.isAnimating) return;
  
  if (state.stack.length === 0) {
    showToast('Stack Underflow! Nothing to pop.', '❌');
    updateNarration(['UNDERFLOW: Stack is empty!', 'Nothing to remove.']);
    // Shake the empty stack
    const stackDrawing = document.querySelector('.stack-drawing');
    if (stackDrawing) stackDrawing.classList.add('shake');
    setTimeout(() => stackDrawing?.classList.remove('shake'), 500);
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.stack.pop);
  
  const value = state.stack[state.stack.length - 1];
  const steps = [
    'Removing element from TOP...',
    `Found "${value}" at TOP`,
    'Decrementing TOP pointer...',
    `✓ Popped "${value}"!`
  ];
  updateNarration(steps);
  
  // First highlight the element
  renderStack(state.stack.length - 1, 'highlight-pop');
  await delay(200);
  
  // Then animate it flying out
  renderStack(state.stack.length - 1, 'pop-out-up');
  await delay(500);
  
  state.stack.pop();
  renderStack();
  updateStatus(state.stack.length, CONFIG.STACK_MAX_SIZE);
  addToHistory('POP', value);
  showToast(`Popped "${value}" from stack`, '📤');
  
  state.isAnimating = false;
}

function renderQueue(highlightIndex = -1, animClass = '') {
  if (!DOM.visualization) return;
  
  if (state.queue.length === 0) {
    DOM.visualization.innerHTML = `
      <div class="queue-sketch">
        <div class="queue-drawing">
          <div class="queue-empty" style="padding: 30px; color: var(--chalk-light); font-family: var(--font-chalk);">
            Queue is empty — Enqueue something!
          </div>
        </div>
        <div class="queue-label">FIFO: First In, First Out</div>
      </div>
    `;
    return;
  }
  
  let elements = '';
  state.queue.forEach((val, i) => {
    const isFront = i === 0;
    const isRear = i === state.queue.length - 1;
    elements += `
      <div class="queue-element ${isFront ? 'front' : ''} ${isRear ? 'rear' : ''} ${i === highlightIndex ? animClass : ''}">
        ${val}
      </div>
      ${i < state.queue.length - 1 ? '<span class="queue-arrow">→</span>' : ''}
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="queue-sketch">
      <div class="queue-drawing">
        ${elements}
      </div>
      <div class="queue-label">FIFO: First In, First Out</div>
    </div>
  `;
}

async function queueEnqueue() {
  if (state.isAnimating) return;
  const input = document.getElementById('value-input');
  if (!input) return;
  
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value!', '⚠️');
    return;
  }
  
  if (state.queue.length >= CONFIG.QUEUE_MAX_SIZE) {
    showToast('Queue Overflow! Cannot enqueue.', '❌');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.queue.enqueue);
  
  const steps = [
    `Enqueuing "${value}"...`,
    'Adding to REAR of queue...',
    'Incrementing REAR pointer...',
    '✓ Enqueue complete!'
  ];
  updateNarration(steps);
  
  state.queue.push(value);
  input.value = '';
  
  renderQueue(state.queue.length - 1, 'pop-in');
  updateStatus(state.queue.length, CONFIG.QUEUE_MAX_SIZE);
  addToHistory('ENQUEUE', value);
  showToast(`Enqueued "${value}"`, '➡️');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function queueDequeue() {
  if (state.isAnimating) return;
  
  if (state.queue.length === 0) {
    showToast('Queue Underflow! Nothing to dequeue.', '❌');
    // Shake the empty queue
    const queueDrawing = document.querySelector('.queue-drawing');
    if (queueDrawing) queueDrawing.classList.add('shake');
    setTimeout(() => queueDrawing?.classList.remove('shake'), 500);
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.queue.dequeue);
  
  const value = state.queue[0];
  const steps = [
    'Removing from FRONT...',
    `Found "${value}" at FRONT`,
    'Incrementing FRONT pointer...',
    `✓ Dequeued "${value}"!`
  ];
  updateNarration(steps);
  
  // First highlight the element
  renderQueue(0, 'highlight-dequeue');
  await delay(200);
  
  // Then animate it sliding out to the left
  renderQueue(0, 'dequeue-out-left');
  await delay(500);
  
  state.queue.shift();
  
  // Animate remaining elements sliding left
  renderQueue(-1, 'slide-left-queue');
  await delay(300);
  
  renderQueue();
  updateStatus(state.queue.length, CONFIG.QUEUE_MAX_SIZE);
  addToHistory('DEQUEUE', value);
  showToast(`Dequeued "${value}"`, '⬅️');
  
  state.isAnimating = false;
}

function resetStackQueue() {
  state.stack = [];
  state.queue = [];
  if (state.currentSubView === 'stack') {
    renderStack();
    updateStatus(0, CONFIG.STACK_MAX_SIZE);
  } else {
    renderQueue();
    updateStatus(0, CONFIG.QUEUE_MAX_SIZE);
  }
  showToast('Cleared!', '🗑️');
}

// ============================================
// PRAJWAL: LINKED LIST
// ============================================

function initLinkedListView() {
  if (!DOM.controlContent) return;
  
  DOM.controlContent.innerHTML = `
    <input type="text" class="sketch-input" id="ll-input" placeholder="Enter value..." maxlength="4">
    <div class="btn-row">
      <button class="sketch-btn success" id="ll-insert-head">Insert Head</button>
      <button class="sketch-btn primary" id="ll-insert-tail">Insert Tail</button>
    </div>
    <input type="text" class="sketch-input" id="ll-delete-input" placeholder="Value to delete..." maxlength="4" style="margin-top: 8px;">
    <button class="sketch-btn danger" id="ll-delete">Delete Node</button>
    <button class="sketch-btn" id="ll-reset" style="margin-top: 8px;">🗑 Clear All</button>
  `;
  
  const insertHeadBtn = document.getElementById('ll-insert-head');
  const insertTailBtn = document.getElementById('ll-insert-tail');
  const deleteBtn = document.getElementById('ll-delete');
  const resetBtn = document.getElementById('ll-reset');
  
  if (insertHeadBtn) insertHeadBtn.addEventListener('click', llInsertHead);
  if (insertTailBtn) insertTailBtn.addEventListener('click', llInsertTail);
  if (deleteBtn) deleteBtn.addEventListener('click', llDelete);
  if (resetBtn) resetBtn.addEventListener('click', llReset);
  
  renderLinkedList();
  updatePseudocode(PSEUDOCODE.linkedlist.insert);
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
}

function renderLinkedList(highlightIndex = -1, animClass = '') {
  if (!DOM.visualization) return;
  
  if (state.linkedList.length === 0) {
    DOM.visualization.innerHTML = `
      <div class="linkedlist-sketch">
        <div class="empty-visual">
          Linked List is empty<br>
          Insert a node to begin!
        </div>
      </div>
    `;
    return;
  }
  
  let nodes = '<span class="head-label">HEAD</span>';
  state.linkedList.forEach((val, i) => {
    nodes += `
      <div class="node-box ${i === highlightIndex ? animClass : ''}">
        <div class="node-data">${val}</div>
        <div class="node-next">next</div>
      </div>
      ${i < state.linkedList.length - 1 ? '<span class="node-arrow">→</span>' : '<span class="node-arrow">→</span><span class="node-null">NULL</span>'}
    `;
  });
  
  DOM.visualization.innerHTML = `
    <div class="linkedlist-sketch">
      <div class="linkedlist-drawing">
        ${nodes}
      </div>
    </div>
  `;
}

async function llInsertHead() {
  if (state.isAnimating) return;
  const input = document.getElementById('ll-input');
  if (!input) return;
  
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value!', '⚠️');
    return;
  }
  
  if (state.linkedList.length >= CONFIG.LINKEDLIST_MAX_SIZE) {
    showToast('List is full!', '❌');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.linkedlist.insert);
  
  const steps = [
    `Creating new node with value "${value}"...`,
    'Setting new node\'s next to current HEAD...',
    'Moving HEAD to new node...',
    '✓ Insert at head complete!'
  ];
  updateNarration(steps);
  
  state.linkedList.unshift(value);
  input.value = '';
  
  renderLinkedList(0, 'pop-in');
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
  addToHistory('INSERT HEAD', value);
  showToast(`Inserted "${value}" at head`, '🔗');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function llInsertTail() {
  if (state.isAnimating) return;
  const input = document.getElementById('ll-input');
  if (!input) return;
  
  const value = input.value.trim();
  
  if (!value) {
    showToast('Please enter a value!', '⚠️');
    return;
  }
  
  if (state.linkedList.length >= CONFIG.LINKEDLIST_MAX_SIZE) {
    showToast('List is full!', '❌');
    return;
  }
  
  state.isAnimating = true;
  
  const steps = [
    `Creating new node with value "${value}"...`,
    'Traversing to end of list...',
    'Setting last node\'s next to new node...',
    '✓ Insert at tail complete!'
  ];
  updateNarration(steps);
  
  state.linkedList.push(value);
  input.value = '';
  
  renderLinkedList(state.linkedList.length - 1, 'pop-in');
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
  addToHistory('INSERT TAIL', value);
  showToast(`Inserted "${value}" at tail`, '🔗');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function llDelete() {
  if (state.isAnimating) return;
  const input = document.getElementById('ll-delete-input');
  if (!input) return;
  
  const value = input.value.trim();
  
  if (!value) {
    showToast('Enter value to delete!', '⚠️');
    return;
  }
  
  const index = state.linkedList.indexOf(value);
  if (index === -1) {
    showToast(`"${value}" not found in list!`, '❌');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.linkedlist.delete);
  
  const steps = [
    `Searching for "${value}"...`,
    `Found at position ${index + 1}`,
    'Updating previous node\'s next pointer...',
    '✓ Node deleted!'
  ];
  updateNarration(steps);
  
  renderLinkedList(index, 'fade-out');
  await delay(300);
  
  state.linkedList.splice(index, 1);
  input.value = '';
  
  renderLinkedList();
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
  addToHistory('DELETE', value);
  showToast(`Deleted "${value}"`, '🗑️');
  
  state.isAnimating = false;
}

function llReset() {
  state.linkedList = [];
  renderLinkedList();
  updateStatus(0, CONFIG.LINKEDLIST_MAX_SIZE);
  showToast('List cleared!', '🗑️');
}

// ============================================
// NAGARAJ: MEMORY MANAGEMENT
// ============================================

function initMemoryView() {
  if (!DOM.controlContent) return;
  
  DOM.controlContent.innerHTML = `
    <input type="text" class="sketch-input" id="mem-name" placeholder="Variable name (e.g., ptr)" maxlength="6">
    <input type="number" class="sketch-input" id="mem-size" placeholder="Size in bytes" min="1" max="128">
    <div class="btn-row">
      <button class="sketch-btn" id="mem-malloc" style="background: var(--pastel-yellow);">malloc</button>
      <button class="sketch-btn" id="mem-calloc" style="background: var(--pastel-green);">calloc</button>
    </div>
    <div class="btn-row">
      <button class="sketch-btn" id="mem-realloc" style="background: var(--pastel-purple);">realloc</button>
      <button class="sketch-btn danger" id="mem-free">free</button>
    </div>
    <select class="sketch-input" id="mem-select" style="margin-top: 8px;">
      <option value="">-- Select block --</option>
    </select>
  `;
  
  const mallocBtn = document.getElementById('mem-malloc');
  const callocBtn = document.getElementById('mem-calloc');
  const reallocBtn = document.getElementById('mem-realloc');
  const freeBtn = document.getElementById('mem-free');
  
  if (mallocBtn) mallocBtn.addEventListener('click', memMalloc);
  if (callocBtn) callocBtn.addEventListener('click', memCalloc);
  if (reallocBtn) reallocBtn.addEventListener('click', memRealloc);
  if (freeBtn) freeBtn.addEventListener('click', memFree);
  
  renderMemory();
  updateMemorySelect();
  updatePseudocode(PSEUDOCODE.memory.malloc);
  updateStatus(getTotalAllocated(), CONFIG.HEAP_SIZE);
}

function getTotalAllocated() {
  return state.memoryBlocks.reduce((sum, b) => sum + b.size, 0);
}

function generateAddr() {
  return '0x' + (Math.floor(Math.random() * 0xFFFF) + 0x1000).toString(16).toUpperCase();
}

function updateMemorySelect() {
  const select = document.getElementById('mem-select');
  if (!select) return;
  select.innerHTML = '<option value="">-- Select block --</option>' +
    state.memoryBlocks.map(b => `<option value="${b.id}">${b.name} (${b.size}B)</option>`).join('');
}

function renderMemory(highlightId = -1, animClass = '') {
  if (!DOM.visualization) return;
  
  const total = getTotalAllocated();
  const free = CONFIG.HEAP_SIZE - total;
  
  let blocks = '';
  state.memoryBlocks.forEach(b => {
    const width = Math.max((b.size / CONFIG.HEAP_SIZE) * 100, 10);
    blocks += `
      <div class="mem-block ${b.type === 'malloc' ? 'allocated-malloc' : 'allocated-calloc'} ${b.id === highlightId ? animClass : ''}" 
           style="width: ${width}%;">
        <span class="block-name">${b.name}</span>
        <span class="block-addr">${b.addr}</span>
        <span class="block-size">${b.size}B</span>
      </div>
    `;
  });
  
  if (free > 0) {
    blocks += `
      <div class="mem-block free-space" style="width: ${(free / CONFIG.HEAP_SIZE) * 100}%;">
        <span>FREE</span>
      </div>
    `;
  }
  
  DOM.visualization.innerHTML = `
    <div class="memory-sketch">
      <div class="heap-drawing">
        <div class="heap-title">🧠 Heap Memory (${CONFIG.HEAP_SIZE} bytes)</div>
        <div class="heap-bar">
          ${blocks || '<div class="mem-block free-space" style="width: 100%;"><span>ALL FREE</span></div>'}
        </div>
      </div>
      <div class="mem-legend">
        <div class="legend-item"><span class="legend-color malloc"></span> malloc (uninitialized)</div>
        <div class="legend-item"><span class="legend-color calloc"></span> calloc (zeroed)</div>
        <div class="legend-item"><span class="legend-color free"></span> Free space</div>
      </div>
    </div>
  `;
  
  updateStatus(total, CONFIG.HEAP_SIZE);
}

async function memMalloc() {
  if (state.isAnimating) return;
  
  const nameInput = document.getElementById('mem-name');
  const sizeInput = document.getElementById('mem-size');
  
  const name = nameInput ? nameInput.value.trim() || `p${state.nextMemId}` : `p${state.nextMemId}`;
  const size = sizeInput ? parseInt(sizeInput.value) || 0 : 0;
  
  if (size <= 0 || size > 128) {
    showToast('Enter size (1-128 bytes)', '⚠️');
    return;
  }
  
  if (getTotalAllocated() + size > CONFIG.HEAP_SIZE) {
    showToast('Not enough memory!', '❌');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.malloc);
  
  const steps = [
    `malloc(${size}) called...`,
    'Searching for free block...',
    'Found space! Allocating...',
    `⚠️ Memory is UNINITIALIZED!`,
    `✓ Assigned to "${name}"`
  ];
  updateNarration(steps);
  
  const block = {
    id: state.nextMemId++,
    name, size,
    addr: generateAddr(),
    type: 'malloc'
  };
  
  state.memoryBlocks.push(block);
  if (nameInput) nameInput.value = '';
  if (sizeInput) sizeInput.value = '';
  
  renderMemory(block.id, 'pop-in');
  updateMemorySelect();
  addToHistory('MALLOC', `${name} (${size}B)`);
  showToast(`malloc: ${size} bytes for "${name}"`, '📦');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function memCalloc() {
  if (state.isAnimating) return;
  
  const nameInput = document.getElementById('mem-name');
  const sizeInput = document.getElementById('mem-size');
  
  const name = nameInput ? nameInput.value.trim() || `arr${state.nextMemId}` : `arr${state.nextMemId}`;
  const size = sizeInput ? parseInt(sizeInput.value) || 0 : 0;
  
  if (size <= 0 || size > 128) {
    showToast('Enter size (1-128 bytes)', '⚠️');
    return;
  }
  
  if (getTotalAllocated() + size > CONFIG.HEAP_SIZE) {
    showToast('Not enough memory!', '❌');
    return;
  }
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.calloc);
  
  const steps = [
    `calloc(1, ${size}) called...`,
    'Searching for free block...',
    'Found space! Allocating...',
    'Initializing all bytes to ZERO...',
    `✓ Assigned to "${name}"`
  ];
  updateNarration(steps);
  
  const block = {
    id: state.nextMemId++,
    name, size,
    addr: generateAddr(),
    type: 'calloc'
  };
  
  state.memoryBlocks.push(block);
  if (nameInput) nameInput.value = '';
  if (sizeInput) sizeInput.value = '';
  
  renderMemory(block.id, 'pop-in');
  updateMemorySelect();
  addToHistory('CALLOC', `${name} (${size}B)`);
  showToast(`calloc: ${size} zero-bytes for "${name}"`, '🧹');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function memRealloc() {
  if (state.isAnimating) return;
  
  const selectInput = document.getElementById('mem-select');
  const sizeInput = document.getElementById('mem-size');
  
  const blockId = selectInput ? parseInt(selectInput.value) : 0;
  const newSize = sizeInput ? parseInt(sizeInput.value) || 0 : 0;
  
  if (!blockId) {
    showToast('Select a block first!', '⚠️');
    return;
  }
  
  if (newSize <= 0 || newSize > 128) {
    showToast('Enter new size (1-128)', '⚠️');
    return;
  }
  
  const block = state.memoryBlocks.find(b => b.id === blockId);
  if (!block) return;
  
  const diff = newSize - block.size;
  if (diff > 0 && getTotalAllocated() + diff > CONFIG.HEAP_SIZE) {
    showToast('Not enough memory!', '❌');
    return;
  }
  
  state.isAnimating = true;
  
  const oldSize = block.size;
  block.size = newSize;
  block.addr = generateAddr();
  
  const steps = [
    `realloc(${block.name}, ${newSize})...`,
    `Old size: ${oldSize} bytes`,
    newSize > oldSize ? 'Expanding allocation...' : 'Shrinking allocation...',
    `✓ New size: ${newSize} bytes`
  ];
  updateNarration(steps);
  
  if (sizeInput) sizeInput.value = '';
  
  renderMemory(block.id, 'pop-in');
  updateMemorySelect();
  addToHistory('REALLOC', `${block.name}: ${oldSize}→${newSize}B`);
  showToast(`realloc: ${block.name} now ${newSize}B`, '🔄');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function memFree() {
  if (state.isAnimating) return;
  
  const selectInput = document.getElementById('mem-select');
  const blockId = selectInput ? parseInt(selectInput.value) : 0;
  
  if (!blockId) {
    showToast('Select a block to free!', '⚠️');
    return;
  }
  
  const index = state.memoryBlocks.findIndex(b => b.id === blockId);
  if (index === -1) return;
  
  const block = state.memoryBlocks[index];
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.memory.free);
  
  const steps = [
    `free(${block.name}) called...`,
    `Releasing ${block.size} bytes...`,
    'Memory returned to heap.',
    `⚠️ "${block.name}" is now invalid!`
  ];
  updateNarration(steps);
  
  renderMemory(block.id, 'fade-out');
  await delay(400);
  
  state.memoryBlocks.splice(index, 1);
  
  renderMemory();
  updateMemorySelect();
  addToHistory('FREE', `${block.name} (${block.size}B)`);
  showToast(`free: Released "${block.name}"`, '🗑️');
  
  state.isAnimating = false;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM references
  initDOM();
  
  // Set up member button click handlers
  if (DOM.memberBtns && DOM.memberBtns.length > 0) {
    DOM.memberBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        switchMember(btn.dataset.member);
      });
    });
  }
  
  // Step navigation (if elements exist)
  if (DOM.prevStep) {
    DOM.prevStep.addEventListener('click', () => {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex--;
        updateNarration(state.currentSteps, state.currentStepIndex);
      }
    });
  }

  if (DOM.nextStep) {
    DOM.nextStep.addEventListener('click', () => {
      if (state.currentStepIndex < state.currentSteps.length - 1) {
        state.currentStepIndex++;
        updateNarration(state.currentSteps, state.currentStepIndex);
      }
    });
  }
  
  // Start with Omkar's Stack & Queue view
  switchMember('omkar');
  
  console.log('%c Data Structures - Whiteboard Style ', 
    'background: #f5f3ef; color: #2d2d2d; font-size: 16px; padding: 8px 16px; border: 2px solid #2d2d2d; border-radius: 4px; font-family: Caveat, cursive;');
  console.log('Team: Nagaraj, Omkar, Prajwal');
  console.log('Guide: Dr. Pooja Aspalli Ma\'am');
});
