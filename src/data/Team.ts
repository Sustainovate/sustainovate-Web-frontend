interface TeamMember {
  id: number;
  name: string;
  domain: string,
  role: string;
  github?: string;
  linkedin?: string;
  x?: string;
}

export const team: TeamMember[] = [
  {
    id: 1,
    name: "Jit Mukherjee",
    domain: "Green Tech",
    role: "Team Lead",
    github: "https://github.com/codesbyjit",
    linkedin: "https://linkedin.com/in/jit_mukherjee",
    x: "https://x.com/jit_mukherjee05",
  },
  {
    id: 2,
    name: "Mainak Panda",
    domain: "Green Tech",
    role: "Backend",
    github: "https://github.com/0xmainak",
    linkedin: "https://linkedin.com/in/mainak",
  },
  {
    id: 3,
    name: "Archisman",
    domain: "Green Tech",
    role: "UI/UX",
    github: "https://github.com/Archisman936",
    linkedin: "https://linkedin.com/in/archisman",
  },
  {
    id: 4,
    name: "Himanshu",
    domain: "Green Tech",
    role: "Alien",
    github: "https://github.com/himonshuuu",
    linkedin: "https://linkedin.com/in/mainak",
  },
];