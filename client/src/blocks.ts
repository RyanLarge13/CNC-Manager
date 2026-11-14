export const steps = {
  0: 'Stock Drawing',
  1: 'Stock Cut',
  2: 'Programming',
  3: 'Ready to Run',
  4: 'Needs Sign-Off',
  5: 'Complete',
} as const;

export type Step = keyof typeof steps;
type ActiveSteps = readonly [Step] | readonly [1, 2];

interface Block {
  id: string;
  style: string;
  moldCount: number;
  dueDate: string;
  activeSteps: ActiveSteps;
  drawingUrl: string | null;
}

interface Job {
  id: string;
  address: string;
  blocks: Block[];
}

export const jobs: Job[] = [
  {
    id: 'P0012',
    address: '229 West North Boulevard',
    blocks: [
      { id: 'P0012-001', style: 'AB24', moldCount: 3, dueDate: '2026-11-20', activeSteps: [0], drawingUrl: null },
      { id: 'P0012-002', style: 'CD18', moldCount: 1, dueDate: '2026-11-20', activeSteps: [1, 2], drawingUrl: null },
      { id: 'P0012-003', style: 'EF32', moldCount: 4, dueDate: '2026-11-20', activeSteps: [1], drawingUrl: null },
      { id: 'P0012-004', style: 'GH07', moldCount: 2, dueDate: '2026-11-24', activeSteps: [2], drawingUrl: null },
      { id: 'P0012-005', style: 'JK41', moldCount: 6, dueDate: '2026-11-24', activeSteps: [3], drawingUrl: null },
      { id: 'P0012-006', style: 'LM16', moldCount: 2, dueDate: '2026-11-24', activeSteps: [4], drawingUrl: null },
    ],
  },
  {
    id: 'P0013',
    address: '418 East Foundry Avenue',
    blocks: [
      { id: 'P0013-001', style: 'AB24', moldCount: 5, dueDate: '2026-11-23', activeSteps: [3], drawingUrl: null },
      { id: 'P0013-002', style: 'NP28', moldCount: 1, dueDate: '2026-11-23', activeSteps: [1, 2], drawingUrl: null },
      { id: 'P0013-003', style: 'QR53', moldCount: 3, dueDate: '2026-11-23', activeSteps: [4], drawingUrl: null },
      { id: 'P0013-004', style: 'ST09', moldCount: 2, dueDate: '2026-11-27', activeSteps: [0], drawingUrl: null },
      { id: 'P0013-005', style: 'UV36', moldCount: 4, dueDate: '2026-11-27', activeSteps: [2], drawingUrl: null },
      { id: 'P0013-006', style: 'WX62', moldCount: 1, dueDate: '2026-11-27', activeSteps: [5], drawingUrl: null },
    ],
  },
];
