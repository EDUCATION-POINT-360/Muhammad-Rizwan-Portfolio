import { jsPDF } from 'jspdf';

export function downloadCvPdf() {
  try {
    // Primary method: trigger direct download of the pre-compiled clean vector ATS PDF
    const link = document.createElement('a');
    link.href = '/cv/Muhammad-Rizwan-CV.pdf';
    link.download = 'Muhammad-Rizwan-CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Static PDF download failed, falling back to dynamic generator:', err);
    generateAndDownloadDynamicPdf();
  }
}

export function generateAndDownloadDynamicPdf() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const margin = 42;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  let y = 46;

  const checkPageBreak = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      y = 46;
    }
  };

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(24, 24, 27);
  doc.text('MUHAMMAD RIZWAN', margin, y);
  y += 18;

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(70, 70, 78);
  doc.text('Founder • Educationist • Digital Architect | Digital Product Builder', margin, y);
  y += 15;

  // Contact
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 98);
  doc.text('Email: educationpoint0360@gmail.com  |  Phone / WhatsApp: +92 331 4220506  |  Mianwali, Pakistan', margin, y);
  y += 13;
  doc.text('Portfolio: https://rizwanep.netlify.app/  |  Platform: https://educationpoint360.netlify.app/', margin, y);
  y += 18;

  // Divider
  doc.setDrawColor(220, 220, 225);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + contentWidth, y);
  y += 18;

  const renderSectionHeader = (title: string) => {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(24, 24, 27);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(30, 30, 35);
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 12;
  };

  // Summary
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 56);
  const summary =
    'Muhammad Rizwan is a Founder, Educationist and Digital Architect focused on building practical digital products across education, web technology and emerging AI experiences. As the founder of Education Point, he works on developing student-focused digital platforms and technology-driven learning experiences. His portfolio includes education platforms, AI experiments, PWAs and social digital products. Open to international opportunities, remote roles, and technology collaborations.';
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 12 + 10;

  // Skills
  renderSectionHeader('Core Skills & Technical Competencies');
  const skillGroups = [
    {
      label: 'Digital Product Development',
      skills: 'Product Concept Development, Web Platform Development, Digital Project Architecture, Feature Planning, User-focused Product Design',
    },
    {
      label: 'Web Technologies',
      skills: 'HTML, CSS, JavaScript, Responsive Web Design, Progressive Web Apps (PWA), REST API Integration',
    },
    {
      label: 'Platforms & Tools',
      skills: 'Supabase, GitHub, Netlify, Google Drive Integrations, REST APIs, AI / OpenRouter APIs',
    },
    {
      label: 'AI & Emerging Technology',
      skills: 'AI-powered web applications, AI API integration, AI product experimentation, Prompt engineering, AI-assisted development',
    },
  ];

  skillGroups.forEach((group) => {
    checkPageBreak(24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 35);
    doc.text(`• ${group.label}: `, margin, y);
    const labelWidth = doc.getTextWidth(`• ${group.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 68);
    const lines = doc.splitTextToSize(group.skills, contentWidth - labelWidth);
    doc.text(lines, margin + labelWidth, y);
    y += lines.length * 11 + 4;
  });
  y += 6;

  // Experience
  renderSectionHeader('Founder Experience & Independent Projects');
  checkPageBreak(70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(24, 24, 27);
  doc.text('Founder & Owner — Education Point', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 98);
  doc.text('2024 – Present  |  Mianwali, Pakistan / Remote', margin + contentWidth, y, { align: 'right' });
  y += 14;

  const expBullets = [
    'Spearheaded the conceptualization, architecture, and deployment of Education Point (educationpoint360.netlify.app), a dedicated academic portal built for students preparing for Matric, Intermediate, and competitive Entry Tests.',
    'Organized and deployed curriculum resources across 10+ key categories: Notes, MCQs, Past Papers, Guess Papers, Pairing Schemes, Test Series, and Preparation Material.',
    'Designed responsive web interfaces prioritized for fast loading on mobile and desktop devices across varied network bandwidths.',
    'Engineered accompanying digital products including Education Point AI (intelligent study assistant) and Education Point Courses to broaden educational accessibility.',
  ];

  expBullets.forEach((bullet) => {
    checkPageBreak(24);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 56);
    const textLines = doc.splitTextToSize(`- ${bullet}`, contentWidth - 8);
    doc.text(textLines, margin + 8, y);
    y += textLines.length * 11 + 3;
  });
  y += 6;

  // Projects
  renderSectionHeader('Selected Featured Projects');
  const projects = [
    {
      name: 'Education Point',
      category: 'Education Technology (EdTech)',
      url: 'https://educationpoint360.netlify.app/',
      desc: 'An education platform focused on providing students with structured academic resources, notes, preparation material, MCQs, past papers, pairing schemes, tests and other learning resources.',
    },
    {
      name: 'Education Point AI',
      category: 'AI / Education Technology',
      url: 'https://edupointai.netlify.app/',
      desc: 'An AI-focused educational product designed to explore intelligent assistance and student-focused digital learning experiences.',
    },
    {
      name: 'Education Point Courses',
      category: 'Education / Online Learning',
      url: 'https://epcourse.netlify.app/',
      desc: 'A digital learning platform focused on structured courses, practical knowledge modules, and digital skill development.',
    },
    {
      name: 'SoulBook',
      category: 'Social / Digital Platform',
      url: 'https://soulbook.netlify.app/',
      desc: 'A social-platform concept focused on creating a modern digital space for user interaction, post creation, dynamic feeds, and content sharing.',
    },
    {
      name: 'NUR Islamic',
      category: 'Islamic Technology / PWA',
      url: 'https://nurislamic.netlify.app/',
      desc: 'A digital Islamic platform bringing together Quran, Hadith, prayer-related tools, daily adhkar, digital Tasbeeh, and sacred resources in a modern web experience.',
    },
  ];

  projects.forEach((proj) => {
    checkPageBreak(36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(24, 24, 27);
    doc.text(proj.name, margin, y);
    const nameWidth = doc.getTextWidth(proj.name);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(90, 90, 98);
    doc.text(` (${proj.category})  —  ${proj.url}`, margin + nameWidth, y);
    y += 12;

    doc.setFontSize(8.5);
    doc.setTextColor(55, 55, 62);
    const descLines = doc.splitTextToSize(proj.desc, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 10 + 6;
  });

  // Education
  renderSectionHeader('Education');
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(24, 24, 27);
  doc.text('Intermediate in Computer Science (ICS)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 98);
  doc.text('Higher Secondary Certificate  |  Score: 70%', margin + contentWidth, y, { align: 'right' });
  y += 12;
  doc.setTextColor(60, 60, 68);
  doc.text('Core coursework: Computer Science, Mathematics, Physics and Logic Fundamentals.', margin, y);
  y += 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(24, 24, 27);
  doc.text('Secondary School Certificate (Matric — Computer Science)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 98);
  doc.text('Secondary Education  |  Score: 85%', margin + contentWidth, y, { align: 'right' });
  y += 12;
  doc.setTextColor(60, 60, 68);
  doc.text('Built early foundation in computing, information technology and programming logic.', margin, y);
  y += 16;

  // Certs & Languages
  renderSectionHeader('Certifications, Languages & International Availability');
  checkPageBreak(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 35);
  doc.text('Certifications: ', margin, y);
  const certWidth = doc.getTextWidth('Certifications: ');
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 68);
  doc.text('Certifications will be added as verified credentials become available.', margin + certWidth, y);
  y += 13;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 35);
  doc.text('Languages: ', margin, y);
  const langWidth = doc.getTextWidth('Languages: ');
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 68);
  doc.text('English (Professional Working Proficiency)  |  Urdu (Native)', margin + langWidth, y);
  y += 13;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 35);
  doc.text('International Opportunities: ', margin, y);
  const oppWidth = doc.getTextWidth('International Opportunities: ');
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 68);
  doc.text('Open to remote opportunities, international internships, web development, frontend engineering & digital product collaborations.', margin + oppWidth, y);
  y += 16;

  doc.save('Muhammad-Rizwan-CV.pdf');
}
