<template>
  <div>
    <h2>功能模块三</h2>
    <p>任务奖池</p>
    <p>当前时间：{{ formattedDate }}</p>
    <p>任务完成量: {{ tasksCompleted }}</p>
    <p>奖金池子总额: {{ bonusPoolTotal }}.ETH</p>
  </div>
</template>

<script>
export default {
  name: "ModuleThree",
  props: ["tasksCompleted"],
  data() {
    return {
      currentDate: new Date(),
     
    };
  },
  computed: {
    formattedDate() {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formatter = new Intl.DateTimeFormat(navigator.language, options);
      return formatter.format(this.currentDate);
    },
     bonusPoolTotal() {
      // 计算奖金池总额，依赖于 tasksCompleted prop
      return this.tasksCompleted * 100;
    },
  },
  
//   // ModuleThree 组件中
// created() {
//   console.log('Tasks Completed:', this.tasksCompleted);
//   console.log('Bonus Pool Total:', this.bonusPoolTotal);
// }
};
</script>
