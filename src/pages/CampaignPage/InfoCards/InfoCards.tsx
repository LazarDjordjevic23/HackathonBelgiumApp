import React from 'react';
import InfoCardWrapper from './InfoCardWrapper/InfoCardWrapper';
import TaskBunnyCard from './TaskBunnyCard/TaskBunnyCard';
import CompanyCard from './CompanyCard/CompanyCard';

export default function InfoCards() {
  return (
    <>
      <div className="">
        <TaskBunnyCard />
      </div>
      <div className="">
        <CompanyCard />
      </div>
    </>
  );
}
