interface IFaqItem {
  question: string;
  answer: string;
}

interface IFaqData {
  [category: string]: IFaqItem[];
}

export const faqData: IFaqData = {
  'Application Process': [
    {
      question: 'What is the application process?',
      answer:
        'Apply at soulhq.ai. Attempt screening test(s), get trained by world class trainers on prompt engineering, grab opportunities.',
    },
    {
      question: 'That seems like a lengthy process; is it all necessary?',
      answer:
        'Yes - this helps us find the right talent for these exciting jobs that will help you learn the skills of the future and earn well at the same time.',
    },
    {
      question:
        'I saw multiple openings for different types of work - should I apply multiple times?',
      answer:
        'You only need to apply once on soulhq.ai. Once your application is in, you will see all live opportunities.',
    },
    {
      question: 'How do I find out the status of my application?',
      answer:
        'Status of application post completion of screening test and profile evaluation by our expert team gets updated on the dashboard. It usually takes 6-8 weeks for most skills.',
    },
  ],
  'AI Training': [
    {
      question: 'Can you tell me more about the work?',
      answer:
        'You will work on cutting-edge AI models, helping them write better and more accurately. Your key objective is to train these models so that they make fewer mistakes (hallucinations).',
    },
    {
      question: 'Do I need to know AI/ML to be able to perform the tasks?',
      answer:
        'No. It is not mandatory to have AI / ML skills but you need to have deep expertise in your core domain.',
    },
    {
      question: 'What is the type of work, how do I get paid?',
      answer:
        'These are part-time/contract remote roles, you work on your PC as per your schedule. Payments are made twice a month.',
    },
    {
      question: 'Is there a minimum time commitment?',
      answer:
        'No; you can work as little or as much as you want every week. That said, the most common engagement level we see is of folks clocking in around 3 hours a day.',
    },
    {
      question: "The work sounds good and the pay is great; what's the catch here?",
      answer:
        "So here's the catch: these jobs are not for everyone. We require experts who are focused, creative, diligent, and great at what they do. Quality is our key goal. Not everyone gets to become a prompt engineer!",
    },
  ],
  Project: [
    {
      question: 'What are the types of projects?',
      answer:
        'We have many different types of projects, all of which involve engaging with cutting-edge LLMs. In most instances the work will involve writing complex prompts, reviewing them, and doing heavy research in your area of expertise.',
    },
    {
      question: 'Will you train me on the work? Will I get a demo?',
      answer:
        'All in good time! If we shortlist you, we will invite you to onboarding sessions and give you tons of resources to upskill yourself.',
    },
    {
      question: 'Can I work off my smartphone?',
      answer: 'No. We do need you to work off your PC/laptop since these are complex tasks.',
    },
    {
      question: 'What is the duration of the opportunity?',
      answer:
        'The duration of a project entirely depends on how soon the model is trained. That said if you are a high-quality expert, you will see that you get invited to multiple projects.',
    },
    {
      question: 'Is it necessary to take all the tests on the platform?',
      answer:
        'It is recommended to take the English the first so that we can take an informed decision regarding your shortlisting based on your test score and profile. After that, you can take whatever tests you are proficient in.',
    },
    {
      question: 'My English test result is not updated.',
      answer:
        "It takes a couple of weeks for the test results to be reflected on the dashboard. Don't worry your scores are recorded with us and won't affect your shortlisting.",
    },
    {
      question: 'Can I take the English test again?',
      answer:
        "No. You can only take the test once. Don't worry if you couldn't perform well on the English test. We do have many projects where test results may be less relevant like coding or vernacular projects.",
    },
  ],
  Account: [
    {
      question: 'Is my data secure?',
      answer:
        "Your data's in good hands– handled carefully and used strictly to verify your creds.",
    },
    {
      question: 'I have used my college mail ID to register on your platform. How do I update it?',
      answer:
        "You can add your official Email ID under the home tab by clicking on 'Link additional mail' in your Soul AI dashboard.",
    },
    {
      question: 'Why do you need a PAN card?',
      answer:
        'For TDS and as proof of your identity. Your data is safe with us, please refer to our privacy policy.',
    },
    {
      question: 'What activities are considered fraudulent on your platform?',
      answer:
        'No AI usage! This is strictly monitored and content from Wikipedia and subscription content are off-limits too. And remember, one PAN = one account. Keep it simple!',
    },
    {
      question: 'Can I create multiple accounts?',
      answer:
        "Nope, one account per person! Multiple accounts with the same info? Not on our watch. If you're having account trouble, support got your back!",
    },
  ],
  Refund: [
    {
      question: 'How do I get paid?',
      answer:
        'Once you are allocated to a project you will be able to see the payments tab in the sidebar. Kindly fill in your bank details and you shall receive the money on the due date. For more info check https://platform.soulhq.ai/tutorials',
    },
    {
      question: "What's the payment cycle?",
      answer: 'You will be paid every 1st and 3rd week of the month.',
    },
  ],
};

export const faqSectionHeaders = {
  'Application Process': 'Application Process',
  'AI Training': 'AI Training',
  Project: 'Project',
  Account: 'Account',
  Refund: 'Payment',
};
