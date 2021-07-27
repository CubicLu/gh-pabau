import React from 'react'
import userAvatar from '../../assets/images/users/austin.png'
import emailTemplate1 from '../../assets/images/emailTemplate1.png'
import emailTemplate2 from '../../assets/images/emailTemplate2.png'
import emailTemplate3 from '../../assets/images/emailTemplate3.png'
import emailTemplate4 from '../../assets/images/emailTemplate4.png'
import emailTemplate5 from '../../assets/images/emailTemplate5.png'

export const recipientList = [
  {
    relationship: 'emergency-contact',
    firstName: 'Bruno',
    lastName: 'Ballardin',
    email: 'bruno.ballardin@example.com',
    avatar: userAvatar,
  },
  {
    relationship: 'family-member',
    firstName: 'Jessica',
    lastName: 'Winter',
    email: 'jessica.winter@example.com',
    avatar: userAvatar,
  },
  {
    relationship: 'family-member',
    firstName: 'Jeff',
    lastName: 'Koons',
    email: 'jeff.koons@example.com',
    avatar: userAvatar,
  },
  {
    relationship: 'practioner',
    firstName: 'Smith',
    lastName: 'Practice',
    email: 'smith.practice@example.com',
    avatar: userAvatar,
  },
  {
    relationship: 'insurance-provider',
    company: 'BUPA',
    email: 'bupa@example.com',
    avatar: userAvatar,
  },
]

export const templateList = [
  {
    id: 1,
    templateHTML: (
      <div>
        <img src={emailTemplate1} alt="emailTemplate" />
      </div>
    ),
    category: ['Marketing'],
  },
  {
    id: 2,
    templateHTML: (
      <div>
        <img src={emailTemplate2} alt="emailTemplate" />
      </div>
    ),
    category: ['Medical'],
  },
  {
    id: 3,
    templateHTML: (
      <div>
        <img src={emailTemplate3} alt="emailTemplate" />
      </div>
    ),
    category: ['Medical'],
  },
  {
    id: 4,
    templateHTML: (
      <div>
        <img src={emailTemplate4} alt="emailTemplate" />
      </div>
    ),
    category: ['Leads'],
  },
  {
    id: 5,
    templateHTML: (
      <div>
        <img src={emailTemplate5} alt="emailTemplate" />
      </div>
    ),
    category: ['Marketing'],
  },
  {
    id: 6,
    templateHTML: (
      <div>
        <img src={emailTemplate1} alt="emailTemplate" />
      </div>
    ),
    category: ['Financial'],
  },
  {
    id: 7,
    templateHTML: (
      <div>
        <img src={emailTemplate2} alt="emailTemplate" />
      </div>
    ),
    category: ['Leads'],
  },
  {
    id: 8,
    templateHTML: (
      <div>
        <img src={emailTemplate3} alt="emailTemplate" />
      </div>
    ),
    category: ['Financial'],
  },
  {
    id: 9,
    templateHTML: (
      <div>
        <img src={emailTemplate4} alt="emailTemplate" />
      </div>
    ),
    category: ['Medical'],
  },
  {
    id: 10,
    templateHTML: (
      <div>
        <img src={emailTemplate5} alt="emailTemplate" />
      </div>
    ),
    category: ['Marketing'],
  },
]
