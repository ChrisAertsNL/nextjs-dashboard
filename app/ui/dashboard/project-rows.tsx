import React, { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import clsx from 'clsx';
import Link from 'next/link';

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  const { project: projectName, type, workstation, available, href } = project;

  return (
    <div className="mb-4 grid grid-cols-4 items-center rounded-lg bg-gray-100 p-4 shadow-md">
      <div className="col-span-1">
        <p className="font-semibold">{projectName}</p>
      </div>
      <div className="col-span-1">
        <p>{type}</p>
      </div>
      <div className="col-span-1">
        <p>{workstation}</p>
      </div>
      <div className="col-span-1">
        {available ? (
          <Link legacyBehavior href={href}>
            <a className="rounded-full bg-green-500 px-3 py-1 text-white">
              Available
            </a>
          </Link>
        ) : (
          <button className="rounded-full bg-gray-500 px-3 py-1 text-white">
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

const ProjectHierarchy: React.FC = () => {
  return (
    <>
      <div className="mb-4 grid grid-cols-4 items-center rounded-lg bg-gray-100 p-4 shadow-md">
        <div className="col-span-1">
          <p className="font-semibold">{'Project'}</p>
        </div>
        <div className="col-span-1">
          <p className="font-semibold">{'Type'}</p>
        </div>
        <div className="col-span-1">
          <p className="font-semibold">{'Workstation'}</p>
        </div>
        <div className="col-span-1">
          <p className="font-semibold">{'IFC'}</p>
        </div>
      </div>
      <div>
        {projectData.map((project, index) => (
          <ProjectRow key={index} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectHierarchy;

interface Project {
  project: string;
  type: string;
  workstation: string;
  available: boolean;
  href: string;
}

const projectData: Project[] = [
  {
    project: 'Fascinatio',
    type: '1A MIR',
    workstation: '01 IZI Wedi',
    available: true,
    href: '/dashboard/projects',
  },
  {
    project: 'Fascinatio',
    type: '1A MIR',
    workstation: '02 IZI Achterhout',
    available: true,
    href: '/dashboard/projects',
  },
  {
    project: 'Fascinatio',
    type: '1A MIR',
    workstation: '03 IZI Gipsplaten',
    available: true,
    href: '/dashboard/projects',
  },
  {
    project: 'Flex',
    type: '1A',
    workstation: '01 IZI Wedi',
    available: false,
    href: '/dashboard/projects',
  },
  {
    project: 'Flex',
    type: '1A',
    workstation: '02 IZI Achterhout',
    available: false,
    href: '/dashboard/projects',
  },
  {
    project: 'Flex',
    type: '1A',
    workstation: '03 IZI Gipsplaten',
    available: false,
    href: '/dashboard/projects',
  },
  {
    project: 'Flex',
    type: '2A',
    workstation: '01 IZI Wedi',
    available: false,
    href: '/dashboard/projects',
  },
  {
    project: 'Flex',
    type: '2A',
    workstation: '02 IZI Achterhout',
    available: false,
    href: '/dashboard/projects',
  },
  {
    project: 'Flex',
    type: '2A',
    workstation: '03 IZI Gipsplaten',
    available: false,
    href: '/dashboard/projects',
  },
];
