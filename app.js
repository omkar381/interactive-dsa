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
    topic: 'Binary Search',
    badge: 'O(log n)',
    definition: {
      title: 'What is Binary Search?',
      text: 'Binary Search is an efficient algorithm to find an element in a <strong>sorted array</strong>. It repeatedly divides the search space in half, comparing the target with the middle element.',
      points: [
        '→ Time Complexity: O(log n)',
        '→ Requires a SORTED array',
        '→ Divide and Conquer approach',
        '→ Much faster than Linear Search'
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
  },
  hanoi: {
    name: 'Tower of Hanoi',
    topic: 'Tower of Hanoi',
    badge: 'RECURSION',
    definition: {
      title: 'What is Tower of Hanoi?',
      text: '<strong>Tower of Hanoi</strong> is a classic puzzle that demonstrates <strong>recursion</strong>. Move all disks from source peg to destination peg, one at a time, never placing a larger disk on a smaller one.',
      points: [
        '→ Classic recursive problem',
        '→ Minimum moves: 2ⁿ - 1',
        '→ Uses divide and conquer',
        '→ Demonstrates stack behavior'
      ]
    }
  }
};

// C Code templates
const PSEUDOCODE = {
  stack: {
    push: `void push(int element) {
    if (top >= MAX_SIZE - 1) {
        printf("OVERFLOW\\n");
        return;
    }
    top++;
    stack[top] = element;
}`,
    pop: `int pop() {
    if (top < 0) {
        printf("UNDERFLOW\\n");
        return -1;
    }
    int element = stack[top];
    top--;
    return element;
}`
  },
  queue: {
    enqueue: `void enqueue(int element) {
    if (rear >= MAX_SIZE - 1) {
        printf("OVERFLOW\\n");
        return;
    }
    rear++;
    queue[rear] = element;
}`,
    dequeue: `int dequeue() {
    if (front > rear) {
        printf("UNDERFLOW\\n");
        return -1;
    }
    int element = queue[front];
    front++;
    return element;
}`
  },
  linkedlist: {
    insert: `void insertAtHead(int value) {
    Node* newNode = malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = head;
    head = newNode;
}`,
    delete: `void deleteNode(int value) {
    if (head->data == value) {
        head = head->next;
        return;
    }
    Node* curr = head;
    while (curr->next != NULL) {
        if (curr->next->data == value) {
            curr->next = curr->next->next;
            return;
        }
        curr = curr->next;
    }
}`
  },
  binarySearch: {
    search: `int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        
        if (arr[mid] == target)
            return mid;  // Found!
        else if (arr[mid] < target)
            left = mid + 1;  // Search right
        else
            right = mid - 1; // Search left
    }
    return -1;  // Not found
}`,
    sort: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`
  },
  hanoi: {
    recursive: `void towerOfHanoi(int n, char src, char dest, char aux) {
    if (n == 1) {
        printf("Move disk 1: %c -> %c\\n", src, dest);
        return;
    }
    // Move n-1 disks from src to aux
    towerOfHanoi(n-1, src, aux, dest);
    
    // Move nth disk from src to dest
    printf("Move disk %d: %c -> %c\\n", n, src, dest);
    
    // Move n-1 disks from aux to dest
    towerOfHanoi(n-1, aux, dest, src);
}`,
    iterative: `void towerOfHanoiIterative(int n) {
    int totalMoves = (1 << n) - 1; // 2^n - 1
    char pegs[] = {'A', 'B', 'C'};
    
    // For odd n: A->C, A->B, B->C
    // For even n: A->B, A->C, B->C
    if (n % 2 == 0) {
        swap(pegs[1], pegs[2]);
    }
    
    for (int i = 1; i <= totalMoves; i++) {
        int from = (i & (i-1)) % 3;
        int to = ((i | (i-1)) + 1) % 3;
        moveDisk(pegs[from], pegs[to]);
    }
}`
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
  
  // Binary Search state
  bsArray: [],
  bsSortedArray: [],
  bsIsSorted: false,
  bsSearchTarget: null,
  bsLeft: -1,
  bsRight: -1,
  bsMid: -1,
  bsFoundIndex: -1,
  bsSearching: false,
  bsNotFound: false,
  bsSorting: false,
  bsSortingIndices: [], // indices being compared/swapped
  
  // Tower of Hanoi state
  hanoiDisks: 3,
  hanoiTowers: [[], [], []], // Three pegs: A, B, C
  hanoiMoves: [],
  hanoiCurrentMove: 0,
  hanoiAutoPlaying: false,
  hanoiMoveCount: 0,
  
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
    statusTop: document.getElementById('status-top'),
    statusTime: document.getElementById('status-time'),
    statusSpace: document.getElementById('status-space'),
    toastText: document.getElementById('toast-text'),
    
    // Memory display
    memTop: document.getElementById('mem-top'),
    memSize: document.getElementById('mem-size'),
    
    // Mobile elements
    mobileNav: document.getElementById('mobile-nav'),
    mobileNavBtns: document.querySelectorAll('.mobile-nav-btn[data-member]'),
    infoBtn: document.getElementById('info-btn'),
    mobileSheet: document.getElementById('mobile-sheet'),
    mobileOverlay: document.getElementById('mobile-overlay'),
    sheetAlgo: document.getElementById('sheet-algo'),
    sheetTop: document.getElementById('sheet-top'),
    sheetSize: document.getElementById('sheet-size'),
    sheetTitle: document.getElementById('sheet-title'),
    
    // PWA
    pwaPrompt: document.getElementById('pwa-prompt'),
    pwaInstall: document.getElementById('pwa-install'),
    pwaLater: document.getElementById('pwa-later')
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
  // Update top index display
  if (DOM.statusTop) DOM.statusTop.textContent = size > 0 ? size - 1 : -1;
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
          initBinarySearchView();
          break;
        case 'omkar':
          state.currentSubView = 'stack';
          initStackQueueView();
          break;
        case 'prajwal':
          initLinkedListView();
          break;
        case 'hanoi':
          initHanoiView();
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
    <input type="text" class="sketch-input" id="value-input" placeholder="Enter value..." maxlength="4" autocomplete="off">
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
  
  // First highlight the element with pulsing glow
  renderStack(state.stack.length - 1, 'highlight-pop');
  await delay(500);
  
  // Then animate it flying out with spiral effect
  renderStack(state.stack.length - 1, 'pop-out-up');
  await delay(600);
  
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
  
  // First highlight the element with glowing effect
  renderQueue(0, 'highlight-dequeue');
  await delay(500);
  
  // Then animate it swooshing out to the left
  renderQueue(0, 'dequeue-out-left');
  await delay(600);
  
  state.queue.shift();
  
  // Animate remaining elements sliding left with bounce
  renderQueue(-1, 'slide-left-queue');
  await delay(400);
  
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
    <input type="text" class="sketch-input" id="ll-input" placeholder="Enter value..." maxlength="4" autocomplete="off">
    <div class="btn-row">
      <button class="sketch-btn success" id="ll-insert-head">Insert Head</button>
      <button class="sketch-btn primary" id="ll-insert-tail">Insert Tail</button>
    </div>
    <input type="text" class="sketch-input" id="ll-delete-input" placeholder="Value to delete..." maxlength="4" style="margin-top: 8px;" autocomplete="off">
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
  
  // Check if we're applying animation to all nodes (for reconnect effect)
  const applyToAll = highlightIndex === -1 && animClass !== '';
  
  let nodes = '<span class="head-label">HEAD</span>';
  state.linkedList.forEach((val, i) => {
    const nodeAnimClass = (i === highlightIndex || applyToAll) ? animClass : '';
    const arrowAnimClass = (i === highlightIndex && animClass === 'delete-node-explode') ? 'link-break' : 
                          (applyToAll ? animClass : '');
    nodes += `
      <div class="node-box ${nodeAnimClass}">
        <div class="node-data">${val}</div>
        <div class="node-next">next</div>
      </div>
      ${i < state.linkedList.length - 1 ? 
        `<span class="node-arrow ${arrowAnimClass}">→</span>` : 
        `<span class="node-arrow ${arrowAnimClass}">→</span><span class="node-null">NULL</span>`}
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
    'Breaking link connections...',
    'Reconnecting neighboring nodes...',
    '✓ Node deleted!'
  ];
  updateNarration(steps);
  
  // First highlight the node to delete
  renderLinkedList(index, 'highlight-delete');
  await delay(500);
  
  // Animate the node exploding/disappearing
  renderLinkedList(index, 'delete-node-explode');
  await delay(700);
  
  state.linkedList.splice(index, 1);
  input.value = '';
  
  // Animate remaining nodes reconnecting
  renderLinkedList(-1, 'reconnect-nodes');
  await delay(400);
  
  renderLinkedList();
  updateStatus(state.linkedList.length, CONFIG.LINKEDLIST_MAX_SIZE);
  addToHistory('DELETE', value);
  showToast(`Deleted "${value}"`, '💥');
  
  state.isAnimating = false;
}

function llReset() {
  state.linkedList = [];
  renderLinkedList();
  updateStatus(0, CONFIG.LINKEDLIST_MAX_SIZE);
  showToast('List cleared!', '🗑️');
}

// ============================================
// NAGARAJ: BINARY SEARCH
// ============================================

function initBinarySearchView() {
  if (!DOM.controlContent) return;
  
  // Reset binary search state
  state.bsSearching = false;
  state.bsLeft = -1;
  state.bsRight = -1;
  state.bsMid = -1;
  state.bsFoundIndex = -1;
  state.bsNotFound = false;
  
  DOM.controlContent.innerHTML = `
    <input type="text" class="sketch-input" id="bs-input" placeholder="Enter number..." maxlength="4" autocomplete="off">
    <button class="sketch-btn success" id="bs-add">Add Element</button>
    <button class="sketch-btn primary" id="bs-sort" style="margin-top: 6px;">Sort Array</button>
    <div style="margin-top: 10px; border-top: 1px dashed var(--chalk-light); padding-top: 10px;">
      <input type="text" class="sketch-input" id="bs-search-input" placeholder="Search for..." maxlength="4" autocomplete="off">
      <button class="sketch-btn" id="bs-search" style="background: var(--pastel-purple); margin-top: 6px;">🔍 Search</button>
    </div>
    <button class="sketch-btn danger" id="bs-reset" style="margin-top: 10px;">Clear All</button>
  `;
  
  const addBtn = document.getElementById('bs-add');
  const sortBtn = document.getElementById('bs-sort');
  const searchBtn = document.getElementById('bs-search');
  const resetBtn = document.getElementById('bs-reset');
  const input = document.getElementById('bs-input');
  const searchInput = document.getElementById('bs-search-input');
  
  if (addBtn) addBtn.addEventListener('click', bsAddElement);
  if (sortBtn) sortBtn.addEventListener('click', bsSortArray);
  if (searchBtn) searchBtn.addEventListener('click', bsStartSearch);
  if (resetBtn) resetBtn.addEventListener('click', bsReset);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') bsAddElement();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') bsStartSearch();
    });
  }
  
  renderBinarySearch();
  updatePseudocode(PSEUDOCODE.binarySearch.search);
  updateStatus(state.bsArray.length, 10);
  
  // Initial narration based on current state
  if (state.bsArray.length === 0) {
    updateNarration([
      'Welcome to Binary Search!',
      '1️⃣ Add numbers to build an array',
      '2️⃣ Sort the array (for 2+ elements)',
      '3️⃣ Search for any number',
      'Let\'s begin! Enter a number above.'
    ]);
  }
}

function renderBinarySearch() {
  if (!DOM.visualization) return;
  
  // For single element or sorted array, use appropriate display
  // During sorting, use bsSortedArray which holds the current state
  let arr;
  if (state.bsSorting && state.bsSortedArray.length > 0) {
    arr = state.bsSortedArray;
  } else if (state.bsArray.length === 1) {
    arr = state.bsArray;
  } else if (state.bsIsSorted && state.bsSortedArray.length > 0) {
    arr = state.bsSortedArray;
  } else {
    arr = state.bsArray;
  }
  
  if (arr.length === 0) {
    DOM.visualization.innerHTML = `
      <div class="bs-sketch">
        <div class="bs-empty">
          Array is empty<br>
          Add some numbers to begin!
        </div>
      </div>
    `;
    return;
  }
  
  let elements = '';
  arr.forEach((val, i) => {
    let stateClass = '';
    let indexLabel = '';
    
    // Determine the state of this element during sorting
    if (state.bsSorting) {
      if (state.bsSortingIndices.includes(i)) {
        stateClass = 'bs-sorting-active';
      } else {
        stateClass = 'bs-sorting';
      }
    }
    // Determine the state of this element during search
    else if (state.bsNotFound) {
      // All elements dimmed when not found
      stateClass = 'bs-not-found';
    } else if (state.bsSearching) {
      if (state.bsFoundIndex === i) {
        stateClass = 'bs-found';
      } else if (i === state.bsMid) {
        stateClass = 'bs-mid';
      } else if (i >= state.bsLeft && i <= state.bsRight) {
        stateClass = 'bs-active';
      } else {
        stateClass = 'bs-dimmed';
      }
    }
    
    // Show pointer labels
    if (state.bsSearching && state.bsFoundIndex === -1 && !state.bsNotFound) {
      if (i === state.bsLeft) indexLabel = '<span class="bs-pointer bs-left-ptr">L</span>';
      if (i === state.bsRight) indexLabel = '<span class="bs-pointer bs-right-ptr">R</span>';
      if (i === state.bsMid) indexLabel = '<span class="bs-pointer bs-mid-ptr">M</span>';
    }
    
    elements += `
      <div class="bs-element-wrapper">
        ${indexLabel}
        <div class="bs-element ${stateClass}" data-index="${i}">
          ${val}
        </div>
        <span class="bs-index">[${i}]</span>
      </div>
    `;
  });
  
  // Determine status text based on array state
  let statusText;
  let statusClass;
  let showSortHint = false;
  
  if (arr.length === 1) {
    // Single element is always sorted
    statusText = '✓ Ready for Search (1 element)';
    statusClass = 'sorted';
  } else if (state.bsIsSorted) {
    statusText = '✓ Sorted Array — Ready for Search!';
    statusClass = 'sorted';
  } else {
    statusText = '⚠️ Unsorted — Click "Sort Array" first!';
    statusClass = 'unsorted';
    showSortHint = arr.length > 1; // Only show hint with 2+ elements
  }
  
  // Build the result message
  let resultMessage = '';
  if (state.bsSearchTarget !== null) {
    if (state.bsFoundIndex !== -1) {
      resultMessage = `
        <div class="bs-result-box bs-result-found">
          <span class="bs-result-icon">🎯</span>
          <div class="bs-result-content">
            <span class="bs-result-label">Target: <strong>${state.bsSearchTarget}</strong></span>
            <span class="bs-result-text bs-found-text">✓ Found at index [${state.bsFoundIndex}]!</span>
          </div>
        </div>
      `;
    } else if (state.bsNotFound) {
      resultMessage = `
        <div class="bs-result-box bs-result-not-found">
          <span class="bs-result-icon">❌</span>
          <div class="bs-result-content">
            <span class="bs-result-label">Target: <strong>${state.bsSearchTarget}</strong></span>
            <span class="bs-result-text bs-not-found-text">Element NOT found in array!</span>
          </div>
        </div>
      `;
    } else {
      resultMessage = `
        <div class="bs-target-info">
          Searching for: <strong>${state.bsSearchTarget}</strong>
        </div>
      `;
    }
  }
  
  DOM.visualization.innerHTML = `
    <div class="bs-sketch">
      <div class="bs-title">🔍 Binary Search Visualization</div>
      <div class="bs-status ${statusClass}">${statusText}</div>
      ${showSortHint ? '<div class="bs-sort-hint">👆 Sort the array before searching!</div>' : ''}
      <div class="bs-array-container">
        <div class="bs-array ${state.bsNotFound ? 'bs-array-not-found' : ''}">
          ${elements}
        </div>
      </div>
      ${resultMessage}
      <div class="bs-legend">
        <div class="legend-item"><span class="legend-color bs-active-legend"></span> Search Space</div>
        <div class="legend-item"><span class="legend-color bs-mid-legend"></span> Middle Element</div>
        <div class="legend-item"><span class="legend-color bs-dimmed-legend"></span> Eliminated</div>
        <div class="legend-item"><span class="legend-color bs-found-legend"></span> Found!</div>
      </div>
    </div>
  `;
  
  updateStatus(arr.length, 10);
}

async function bsAddElement() {
  if (state.isAnimating) return;
  const input = document.getElementById('bs-input');
  if (!input) return;
  
  const value = parseInt(input.value.trim());
  
  if (isNaN(value)) {
    showToast('Please enter a valid number!', '⚠️');
    return;
  }
  
  if (state.bsArray.length >= 10) {
    showToast('Array is full! Max 10 elements.', '❌');
    return;
  }
  
  state.isAnimating = true;
  
  // Reset sorted state when adding new element
  state.bsIsSorted = false;
  state.bsSearching = false;
  state.bsSearchTarget = null;
  state.bsFoundIndex = -1;
  state.bsNotFound = false;
  
  state.bsArray.push(value);
  state.bsSortedArray = [...state.bsArray];
  input.value = '';
  
  // Different narration based on array size
  let steps;
  if (state.bsArray.length === 1) {
    steps = [
      `Adding ${value} to the array...`,
      'First element added!',
      'Add more elements or search directly.'
    ];
  } else if (state.bsArray.length < 3) {
    steps = [
      `Adding ${value} to the array...`,
      `Array now has ${state.bsArray.length} elements.`,
      'Add more elements or click Sort to prepare for search.'
    ];
  } else {
    steps = [
      `Adding ${value} to the array...`,
      `Array now has ${state.bsArray.length} elements.`,
      '👉 Click "Sort Array" when ready to search!'
    ];
  }
  updateNarration(steps);
  
  renderBinarySearch();
  addToHistory('ADD', value);
  showToast(`Added ${value} to array`, '➕');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
}

async function bsSortArray() {
  if (state.isAnimating) return;
  if (state.bsArray.length === 0) {
    showToast('Array is empty!', '⚠️');
    return;
  }
  
  if (state.bsIsSorted) {
    showToast('Array is already sorted!', '✓');
    return;
  }
  
  state.isAnimating = true;
  state.bsSorting = true;
  updatePseudocode(PSEUDOCODE.binarySearch.sort);
  
  const steps = [
    'Starting to sort the array...',
    'Using Bubble Sort algorithm...',
    'Comparing adjacent elements...',
    'Swapping if needed...',
    '✓ Array is now sorted!'
  ];
  updateNarration(steps);
  
  // Animate the sorting process
  const arr = [...state.bsArray];
  const n = arr.length;
  
  // Bubble sort with animation
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight elements being compared
      state.bsSortingIndices = [j, j + 1];
      state.bsSortedArray = [...arr];
      renderBinarySearch();
      await delay(200);
      
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Update visual after swap
        state.bsSortedArray = [...arr];
        renderBinarySearch();
        await delay(150);
      }
    }
  }
  
  state.bsSorting = false;
  state.bsSortingIndices = [];
  state.bsSortedArray = arr;
  state.bsIsSorted = true;
  state.bsSearching = false;
  state.bsSearchTarget = null;
  state.bsNotFound = false;
  
  renderBinarySearch();
  addToHistory('SORT', state.bsSortedArray.join(', '));
  showToast('Array sorted! Now you can search.', '✓');
  
  await delay(CONFIG.ANIMATION_DURATION);
  state.isAnimating = false;
  updatePseudocode(PSEUDOCODE.binarySearch.search);
}

async function bsStartSearch() {
  if (state.isAnimating) return;
  
  const input = document.getElementById('bs-search-input');
  if (!input) return;
  
  const target = parseInt(input.value.trim());
  
  if (isNaN(target)) {
    showToast('Enter a number to search!', '⚠️');
    return;
  }
  
  if (state.bsArray.length === 0) {
    showToast('Array is empty! Add elements first.', '⚠️');
    return;
  }
  
  // Allow search on single element OR sorted array
  if (state.bsArray.length > 1 && !state.bsIsSorted) {
    showToast('Please sort the array first!', '⚠️');
    updateNarration([
      '⚠️ Cannot search unsorted array!',
      'Binary search requires a SORTED array.',
      'Click "Sort Array" button first.',
      'Then try searching again.'
    ]);
    return;
  }
  
  // For single element, use the original array
  const arr = state.bsArray.length === 1 ? state.bsArray : state.bsSortedArray;
  
  state.isAnimating = true;
  updatePseudocode(PSEUDOCODE.binarySearch.search);
  
  state.bsSearchTarget = target;
  state.bsSearching = true;
  state.bsFoundIndex = -1;
  state.bsNotFound = false;
  
  // For rendering purposes, make sure sorted array is set for single element
  if (state.bsArray.length === 1) {
    state.bsSortedArray = [...state.bsArray];
  }
  
  let left = 0;
  let right = arr.length - 1;
  let found = false;
  let iteration = 0;
  
  while (left <= right) {
    iteration++;
    const mid = Math.floor((left + right) / 2);
    
    state.bsLeft = left;
    state.bsRight = right;
    state.bsMid = mid;
    
    const steps = [
      `Iteration ${iteration}:`,
      `Left = ${left}, Right = ${right}`,
      `Mid = (${left} + ${right}) / 2 = ${mid}`,
      `Comparing arr[${mid}] = ${arr[mid]} with target ${target}`,
      arr[mid] === target ? '✓ Found the target!' :
        arr[mid] < target ? `${arr[mid]} < ${target}, search RIGHT half` :
        `${arr[mid]} > ${target}, search LEFT half`
    ];
    updateNarration(steps);
    
    renderBinarySearch();
    await delay(800);
    
    if (arr[mid] === target) {
      found = true;
      state.bsFoundIndex = mid;
      state.bsLeft = mid;
      state.bsRight = mid;
      renderBinarySearch();
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  if (found) {
    showToast(`Found ${target} at index ${state.bsFoundIndex}!`, '🎯');
    addToHistory('SEARCH', `${target} → Found at [${state.bsFoundIndex}]`);
    updateNarration([
      '🎯 Search complete!',
      `Target ${target} FOUND!`,
      `Located at index [${state.bsFoundIndex}]`,
      `Value: ${arr[state.bsFoundIndex]}`,
      '✓ Binary search successful!'
    ]);
  } else {
    state.bsNotFound = true;
    state.bsSearching = true; // Keep searching state for visual
    renderBinarySearch();
    showToast(`${target} not found in the array!`, '❌');
    addToHistory('SEARCH', `${target} → Not found`);
    updateNarration([
      '❌ Search complete!',
      `${target} is NOT in the array.`,
      'Left pointer crossed right pointer.',
      'Binary search exhausted all possibilities.',
      'The element does not exist in this array.'
    ]);
  }
  
  input.value = '';
  state.isAnimating = false;
}

function bsReset() {
  state.bsArray = [];
  state.bsSortedArray = [];
  state.bsIsSorted = false;
  state.bsSearchTarget = null;
  state.bsLeft = -1;
  state.bsRight = -1;
  state.bsMid = -1;
  state.bsFoundIndex = -1;
  state.bsSearching = false;
  state.bsNotFound = false;
  
  renderBinarySearch();
  updateStatus(0, 10);
  showToast('Array cleared!', '🗑️');
  updateNarration([
    'Array cleared!',
    '1️⃣ Add numbers to build an array',
    '2️⃣ Sort the array (for 2+ elements)',
    '3️⃣ Search for any number'
  ]);
}

// ============================================
// TOWER OF HANOI
// ============================================

function initHanoiView() {
  if (!DOM.controlContent) return;
  
  // Reset hanoi state
  state.hanoiAutoPlaying = false;
  state.hanoiCurrentMove = 0;
  state.hanoiMoveCount = 0;
  
  DOM.controlContent.innerHTML = `
    <div class="hanoi-controls">
      <label style="color: var(--chalk-light); font-family: var(--font-chalk); margin-bottom: 8px; display: block;">
        Number of Disks: <strong id="disk-count">${state.hanoiDisks}</strong>
      </label>
      <input type="range" id="hanoi-disk-slider" min="2" max="6" value="${state.hanoiDisks}" 
             style="width: 100%; margin-bottom: 12px;">
      <button class="sketch-btn success" id="hanoi-start">🎮 Start Puzzle</button>
      <button class="sketch-btn primary" id="hanoi-solve" style="margin-top: 8px;">🤖 Auto Solve</button>
      <div class="btn-row" style="margin-top: 8px;">
        <button class="sketch-btn" id="hanoi-step">⏭ Step</button>
        <button class="sketch-btn danger" id="hanoi-stop">⏹ Stop</button>
      </div>
      <button class="sketch-btn" id="hanoi-reset" style="margin-top: 8px;">🔄 Reset</button>
    </div>
  `;
  
  const diskSlider = document.getElementById('hanoi-disk-slider');
  const startBtn = document.getElementById('hanoi-start');
  const solveBtn = document.getElementById('hanoi-solve');
  const stepBtn = document.getElementById('hanoi-step');
  const stopBtn = document.getElementById('hanoi-stop');
  const resetBtn = document.getElementById('hanoi-reset');
  
  if (diskSlider) {
    diskSlider.addEventListener('input', (e) => {
      state.hanoiDisks = parseInt(e.target.value);
      document.getElementById('disk-count').textContent = state.hanoiDisks;
    });
  }
  
  if (startBtn) startBtn.addEventListener('click', hanoiStart);
  if (solveBtn) solveBtn.addEventListener('click', hanoiAutoSolve);
  if (stepBtn) stepBtn.addEventListener('click', hanoiStep);
  if (stopBtn) stopBtn.addEventListener('click', hanoiStop);
  if (resetBtn) resetBtn.addEventListener('click', hanoiReset);
  
  // Initialize towers if empty
  if (state.hanoiTowers[0].length === 0 && state.hanoiTowers[1].length === 0 && state.hanoiTowers[2].length === 0) {
    hanoiStart();
  } else {
    renderHanoi();
  }
  
  updatePseudocode(PSEUDOCODE.hanoi.recursive);
  const minMoves = Math.pow(2, state.hanoiDisks) - 1;
  updateStatus(state.hanoiMoveCount, minMoves);
  
  updateNarration([
    'Welcome to Tower of Hanoi!',
    '🎯 Goal: Move all disks from Peg A to Peg C',
    '📏 Rule 1: Move only one disk at a time',
    '📏 Rule 2: Never place larger disk on smaller',
    `⚡ Minimum moves for ${state.hanoiDisks} disks: ${minMoves}`
  ]);
}

function hanoiStart() {
  state.hanoiTowers = [[], [], []];
  state.hanoiMoves = [];
  state.hanoiCurrentMove = 0;
  state.hanoiMoveCount = 0;
  state.hanoiAutoPlaying = false;
  
  // Initialize source peg with disks (largest at bottom)
  for (let i = state.hanoiDisks; i >= 1; i--) {
    state.hanoiTowers[0].push(i);
  }
  
  renderHanoi();
  const minMoves = Math.pow(2, state.hanoiDisks) - 1;
  updateStatus(0, minMoves);
  showToast(`Puzzle started with ${state.hanoiDisks} disks!`, '🎮');
  
  updateNarration([
    `Puzzle initialized with ${state.hanoiDisks} disks!`,
    'All disks are on Peg A (source)',
    'Move them to Peg C (destination)',
    'Use Peg B as auxiliary/helper',
    `Minimum moves needed: ${minMoves}`
  ]);
}

function renderHanoi(highlightDisk = -1, fromPeg = -1, toPeg = -1) {
  if (!DOM.visualization) return;
  
  const pegNames = ['A', 'B', 'C'];
  const pegLabels = ['Source', 'Auxiliary', 'Destination'];
  const maxHeight = 6; // Maximum number of disks that can be displayed
  
  let pegsHtml = '';
  
  for (let p = 0; p < 3; p++) {
    const tower = state.hanoiTowers[p];
    let disksHtml = '';
    
    // Render disks from bottom to top
    for (let d = 0; d < tower.length; d++) {
      const diskSize = tower[d];
      const widthPercent = 30 + (diskSize * 12); // Width based on disk size
      const isHighlighted = diskSize === highlightDisk && (p === fromPeg || p === toPeg);
      const isMoving = diskSize === highlightDisk && p === toPeg;
      
      disksHtml += `
        <div class="hanoi-disk ${isHighlighted ? 'hanoi-disk-highlight' : ''} ${isMoving ? 'hanoi-disk-moving' : ''}" 
             style="width: ${widthPercent}%; --disk-color: hsl(${diskSize * 40}, 70%, 60%);"
             data-size="${diskSize}">
          ${diskSize}
        </div>
      `;
    }
    
    const isPegActive = p === fromPeg || p === toPeg;
    
    pegsHtml += `
      <div class="hanoi-peg-container ${isPegActive ? 'hanoi-peg-active' : ''}">
        <div class="hanoi-peg-label">${pegNames[p]}</div>
        <div class="hanoi-peg-sublabel">${pegLabels[p]}</div>
        <div class="hanoi-peg">
          <div class="hanoi-rod"></div>
          <div class="hanoi-disks">
            ${disksHtml}
          </div>
          <div class="hanoi-base"></div>
        </div>
      </div>
    `;
  }
  
  // Check if puzzle is solved
  const isSolved = state.hanoiTowers[2].length === state.hanoiDisks && 
                   state.hanoiTowers[0].length === 0 && 
                   state.hanoiTowers[1].length === 0;
  
  const minMoves = Math.pow(2, state.hanoiDisks) - 1;
  
  DOM.visualization.innerHTML = `
    <div class="hanoi-sketch">
      <div class="hanoi-title">🗼 Tower of Hanoi</div>
      <div class="hanoi-stats">
        Moves: <strong>${state.hanoiMoveCount}</strong> / ${minMoves} (minimum)
        ${isSolved ? '<span class="hanoi-solved">🎉 SOLVED!</span>' : ''}
      </div>
      <div class="hanoi-towers">
        ${pegsHtml}
      </div>
      ${isSolved ? `
        <div class="hanoi-victory">
          🏆 Congratulations! Puzzle solved in ${state.hanoiMoveCount} moves!
          ${state.hanoiMoveCount === minMoves ? '<br>⭐ Perfect! Minimum moves achieved!' : ''}
        </div>
      ` : ''}
    </div>
  `;
  
  updateStatus(state.hanoiMoveCount, minMoves);
}

function generateHanoiMoves(n, source, dest, aux) {
  if (n === 1) {
    state.hanoiMoves.push({ disk: 1, from: source, to: dest });
    return;
  }
  generateHanoiMoves(n - 1, source, aux, dest);
  state.hanoiMoves.push({ disk: n, from: source, to: dest });
  generateHanoiMoves(n - 1, aux, dest, source);
}

async function hanoiAutoSolve() {
  if (state.isAnimating || state.hanoiAutoPlaying) return;
  
  // Reset and generate moves
  hanoiStart();
  state.hanoiMoves = [];
  generateHanoiMoves(state.hanoiDisks, 0, 2, 1);
  state.hanoiCurrentMove = 0;
  state.hanoiAutoPlaying = true;
  
  updateNarration([
    '🤖 Auto-solving Tower of Hanoi...',
    `Total moves to make: ${state.hanoiMoves.length}`,
    'Using recursive algorithm',
    'Watch the disks move!'
  ]);
  
  await executeHanoiMoves();
}

async function executeHanoiMoves() {
  while (state.hanoiCurrentMove < state.hanoiMoves.length && state.hanoiAutoPlaying) {
    await hanoiExecuteMove(state.hanoiMoves[state.hanoiCurrentMove]);
    state.hanoiCurrentMove++;
    await delay(400);
  }
  
  if (state.hanoiCurrentMove >= state.hanoiMoves.length) {
    state.hanoiAutoPlaying = false;
    showToast('Puzzle solved!', '🎉');
    updateNarration([
      '🎉 Tower of Hanoi SOLVED!',
      `Total moves: ${state.hanoiMoveCount}`,
      `Minimum possible: ${Math.pow(2, state.hanoiDisks) - 1}`,
      'The recursive algorithm is elegant!',
      '✓ All disks now on destination peg!'
    ]);
  }
}

async function hanoiExecuteMove(move) {
  const { disk, from, to } = move;
  const pegNames = ['A', 'B', 'C'];
  
  // Validate move
  const fromTower = state.hanoiTowers[from];
  const toTower = state.hanoiTowers[to];
  
  if (fromTower.length === 0) return;
  if (fromTower[fromTower.length - 1] !== disk) return;
  if (toTower.length > 0 && toTower[toTower.length - 1] < disk) {
    showToast('Invalid move! Cannot place larger disk on smaller.', '❌');
    return;
  }
  
  // Perform move
  fromTower.pop();
  toTower.push(disk);
  state.hanoiMoveCount++;
  
  renderHanoi(disk, from, to);
  
  updateNarration([
    `Move ${state.hanoiMoveCount}:`,
    `Moving disk ${disk} from Peg ${pegNames[from]} to Peg ${pegNames[to]}`,
    `Peg ${pegNames[from]}: [${state.hanoiTowers[from].join(', ') || 'empty'}]`,
    `Peg ${pegNames[to]}: [${state.hanoiTowers[to].join(', ')}]`,
    `Remaining moves: ${state.hanoiMoves.length - state.hanoiCurrentMove - 1}`
  ]);
}

async function hanoiStep() {
  if (state.isAnimating) return;
  
  // Generate moves if not already done
  if (state.hanoiMoves.length === 0) {
    state.hanoiMoves = [];
    generateHanoiMoves(state.hanoiDisks, 0, 2, 1);
    state.hanoiCurrentMove = 0;
  }
  
  if (state.hanoiCurrentMove >= state.hanoiMoves.length) {
    showToast('Puzzle already solved!', '✓');
    return;
  }
  
  state.isAnimating = true;
  await hanoiExecuteMove(state.hanoiMoves[state.hanoiCurrentMove]);
  state.hanoiCurrentMove++;
  state.isAnimating = false;
  
  if (state.hanoiCurrentMove >= state.hanoiMoves.length) {
    showToast('Puzzle solved!', '🎉');
  }
}

function hanoiStop() {
  state.hanoiAutoPlaying = false;
  showToast('Auto-solve stopped', '⏹');
}

function hanoiReset() {
  state.hanoiAutoPlaying = false;
  state.hanoiMoves = [];
  state.hanoiCurrentMove = 0;
  state.hanoiMoveCount = 0;
  hanoiStart();
  showToast('Puzzle reset!', '🔄');
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM references
  initDOM();
  
  // Set up member button click handlers (desktop)
  if (DOM.memberBtns && DOM.memberBtns.length > 0) {
    DOM.memberBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        switchMember(btn.dataset.member);
      });
    });
  }
  
  // Set up mobile navigation click handlers
  if (DOM.mobileNavBtns && DOM.mobileNavBtns.length > 0) {
    DOM.mobileNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const member = btn.dataset.member;
        switchMember(member);
        
        // Update mobile nav active state
        DOM.mobileNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Close sheet if open
        closeMobileSheet();
      });
    });
  }
  
  // Info button for mobile sheet
  if (DOM.infoBtn) {
    DOM.infoBtn.addEventListener('click', toggleMobileSheet);
  }
  
  // Close sheet on overlay click
  if (DOM.mobileOverlay) {
    DOM.mobileOverlay.addEventListener('click', closeMobileSheet);
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
  
  // PWA Install prompt handlers
  setupPWA();
  
  // Start with Omkar's Stack & Queue view
  switchMember('omkar');
  
  console.log('%c Data Structures - Whiteboard Style ', 
    'background: #f5f3ef; color: #2d2d2d; font-size: 16px; padding: 8px 16px; border: 2px solid #2d2d2d; border-radius: 4px; font-family: Caveat, cursive;');
  console.log('Team: Nagaraj, Omkar, Prajwal');
  console.log('Guide: Dr. Pooja Aspalli Ma\'am');
});

// ============================================
// MOBILE FUNCTIONS
// ============================================

function toggleMobileSheet() {
  if (DOM.mobileSheet && DOM.mobileOverlay) {
    const isOpen = DOM.mobileSheet.classList.contains('open');
    if (isOpen) {
      closeMobileSheet();
    } else {
      openMobileSheet();
    }
  }
}

function openMobileSheet() {
  if (DOM.mobileSheet) {
    DOM.mobileSheet.classList.add('open');
    updateMobileSheet();
  }
  if (DOM.mobileOverlay) {
    DOM.mobileOverlay.classList.add('open');
  }
}

function closeMobileSheet() {
  if (DOM.mobileSheet) {
    DOM.mobileSheet.classList.remove('open');
  }
  if (DOM.mobileOverlay) {
    DOM.mobileOverlay.classList.remove('open');
  }
}

function updateMobileSheet() {
  const config = MEMBERS[state.currentMember];
  
  // Update title
  if (DOM.sheetTitle) {
    DOM.sheetTitle.textContent = config.topic + ' - Behind the Scenes';
  }
  
  // Update algorithm
  if (DOM.sheetAlgo) {
    let code = '';
    switch (state.currentMember) {
      case 'omkar':
        code = state.currentSubView === 'stack' 
          ? PSEUDOCODE.stack.push 
          : PSEUDOCODE.queue.enqueue;
        break;
      case 'prajwal':
        code = PSEUDOCODE.linkedlist.insert;
        break;
      case 'nagaraj':
        code = PSEUDOCODE.memory.malloc;
        break;
    }
    DOM.sheetAlgo.innerHTML = `<pre>${code}</pre>`;
  }
  
  // Update stats
  if (DOM.sheetSize) {
    switch (state.currentMember) {
      case 'omkar':
        DOM.sheetSize.textContent = state.currentSubView === 'stack' 
          ? state.stack.length 
          : state.queue.length;
        break;
      case 'prajwal':
        DOM.sheetSize.textContent = state.linkedList.length;
        break;
      case 'nagaraj':
        DOM.sheetSize.textContent = getTotalAllocated() + 'B';
        break;
    }
  }
  
  if (DOM.sheetTop) {
    switch (state.currentMember) {
      case 'omkar':
        DOM.sheetTop.textContent = state.currentSubView === 'stack' 
          ? (state.stack.length > 0 ? state.stack.length - 1 : -1)
          : (state.queue.length > 0 ? 0 : -1);
        break;
      case 'prajwal':
        DOM.sheetTop.textContent = state.linkedList.length > 0 ? 'HEAD' : 'NULL';
        break;
      case 'nagaraj':
        DOM.sheetTop.textContent = state.memoryBlocks.length;
        break;
    }
  }
}

// ============================================
// PWA INSTALL FUNCTIONALITY
// ============================================

let deferredPrompt = null;

function setupPWA() {
  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install prompt after 3 seconds
    setTimeout(() => {
      if (DOM.pwaPrompt && deferredPrompt) {
        DOM.pwaPrompt.classList.add('show');
      }
    }, 3000);
  });
  
  // Install button click
  if (DOM.pwaInstall) {
    DOM.pwaInstall.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('PWA install outcome:', outcome);
        deferredPrompt = null;
        hidePWAPrompt();
      }
    });
  }
  
  // Later button click
  if (DOM.pwaLater) {
    DOM.pwaLater.addEventListener('click', () => {
      hidePWAPrompt();
      // Don't show again for 24 hours
      localStorage.setItem('pwa-prompt-dismissed', Date.now());
    });
  }
  
  // Check if already dismissed recently
  const dismissed = localStorage.getItem('pwa-prompt-dismissed');
  if (dismissed && Date.now() - parseInt(dismissed) < 86400000) {
    // Less than 24 hours, don't show
    deferredPrompt = null;
  }
  
  // Listen for successful install
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    hidePWAPrompt();
    deferredPrompt = null;
  });
}

function hidePWAPrompt() {
  if (DOM.pwaPrompt) {
    DOM.pwaPrompt.classList.remove('show');
  }
}
