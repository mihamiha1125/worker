let currentStep = 0;
const steps = document.querySelectorAll('.step');

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.remove('active');
    if (i === index) {
      gsap.fromTo(step, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
      step.classList.add('active');
    }
  });
}

window.nextStep = function () {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
};

window.prevStep = function () {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
};

window.togglePhoneTime = function (show) {
  document.getElementById('phoneTimeField').style.display = show ? 'block' : 'none';
};

window.showConfirm = function () {
  const form = document.getElementById('workerForm');
  const data = new FormData(form);
  const output = [];

  const labels = {
    skills: 'どのような手伝いができそうですか？',
    skillsOther: 'その他（自由記述）',
    availability: 'いつ働けそうですか？',
    station: 'ご自宅の最寄り駅は？',
    selfIntro: '自己紹介',
    contactMethod: 'ご希望の連絡方法',
    phoneTime: '希望の連絡時間帯',
    name: 'お名前',
    contactInfo: '連絡先'
  };

  const skills = data.getAll('skills');
  const skillsOther = (data.get('skillsOther') || '').trim();
  output.push(`<p><strong>${labels.skills}：</strong> ${skills.length > 0 ? skills.join(', ') : '<span style="color:red">入力されていません</span>'}</p>`);
  if (skills.includes('その他')) {
    output.push(`<p><strong>${labels.skillsOther}：</strong> ${skillsOther || '<span style="color:red">入力されていません</span>'}</p>`);
  }

  const contactMethod = data.get('contactMethod');
  output.push(`<p><strong>${labels.contactMethod}：</strong> ${contactMethod || '<span style="color:red">入力されていません</span>'}</p>`);

  if (contactMethod === '電話') {
    const phoneTime = (data.get('phoneTime') || '').trim();
    output.push(`<p><strong>${labels.phoneTime}：</strong> ${phoneTime || '<span style="color:red">入力されていません</span>'}</p>`);
  }

  const skipKeys = ['skills', 'skillsOther', 'contactMethod', 'phoneTime'];
  for (const [key, value] of data.entries()) {
    if (skipKeys.includes(key)) continue;
    const label = labels[key] || key;
    const displayValue = value.trim() === '' ? '<span style="color:red">入力されていません</span>' : value;
    output.push(`<p><strong>${label}：</strong> ${displayValue}</p>`);
  }

  document.getElementById('confirmArea').innerHTML = output.join('');
  currentStep++;
  showStep(currentStep);
};

// ✅ 正しい送信処理
document.getElementById('workerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = document.getElementById('workerForm');
  const formData = new FormData(form);

  // 複数選択のskillsとskillsOtherを統合
  const skills = formData.getAll('skills');
  const skillsOther = formData.get('skillsOther') || '';
  formData.set('skills', [...skills, skillsOther].filter(Boolean).join(', '));
  formData.delete('skillsOther');

  fetch("https://script.google.com/macros/s/AKfycbypfF983dwr2vdi7w7oj2Rfwwl7Iy7pS6apg5ux7r8S/dev", {
    method: "POST",
    body: formData  // ✅ FormData形式で送信
  })
    .then(() => {
      currentStep++;
      showStep(currentStep); // サンクス画面へ
    })
    .catch(err => {
      alert("送信に失敗しました：" + err);
    });
});
