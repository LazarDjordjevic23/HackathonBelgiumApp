import { Field } from '@/components/Common/Fields/Fields';
import { formatDateToISOExtended } from '@/utils/formatter';
import clsx from 'clsx';
import React from 'react';

// export interface IField {
//   name: string;
//   type: string;
//   label: string;
//   tag?: 'text' | 'img';
//   processData?: (value: any) => any;
// }

export const fields: Field[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Project Name',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
  },
  {
    name: 'website',
    type: 'text',
    label: 'Website URL',
  },
  {
    name: 'twitter',
    type: 'text',
    label: 'Twitter URL',
  },
  {
    name: 'instagram',
    type: 'text',
    label: 'Instagram URL',
  },
  {
    name: 'facebook',
    type: 'text',
    label: 'Facebook URL',
  },
  {
    name: 'tweet_id',
    type: 'text',
    label: 'Tweet ID',
  },
  {
    name: 'start_time',
    type: 'datetime-local',
    label: 'Start Time',
    // processData: (data) => formatDateToISOExtended(data as Date),
  },
  {
    name: 'end_time',
    type: 'datetime-local',
    label: 'End Time',
    // processData: (data) => formatDateToISOExtended(data as Date),
  },
  {
    name: 'total_rewards',
    type: 'number',
    label: 'Total Rewards',
  },
  {
    name: 'image',
    type: 'text',
    label: 'Company Logo',
    tag: 'img',
    // renderField: ({ errors, field, setTouched, setValues, values }) => (
    //   <ImgFiled
    //     name="image"
    //     label="Company Logo"
    //     onImgUploaded={(name, img) => setValues({ ...values, [name]: img })}
    //   />
    // ),
  },
];
