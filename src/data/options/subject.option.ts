import type { Option } from './option';

export type Subject =
  | 'testimonial'
  | 'offering'
  | 'collaboration_request'
  | 'feedback'
  | 'bug_report'
  | 'hello';

export const Subject: Record<Subject, Option<Subject>> = {
  testimonial: {
    value: 'testimonial',
    label: {
      en: 'Testimonial',
      id: 'Testimonial',
    },
  },
  offering: {
    value: 'offering',
    label: {
      en: 'Offering letter',
      id: 'Surat penawaran',
    },
  },
  collaboration_request: {
    value: 'collaboration_request',
    label: {
      en: 'Collaboration request',
      id: 'Permintaan kolaborasi',
    },
  },
  feedback: {
    value: 'feedback',
    label: {
      en: 'Feedback',
      id: 'Masukan',
    },
  },
  bug_report: {
    value: 'bug_report',
    label: {
      en: 'Bug report',
      id: 'Lapor bug',
    },
  },
  hello: {
    value: 'hello',
    label: {
      en: 'Hello',
      id: 'Halo',
    },
  },
};

export const Subjects = Object.values(Subject);
