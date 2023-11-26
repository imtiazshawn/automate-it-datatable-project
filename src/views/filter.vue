<template>
  <div class="container">
    <div class="table">
      <FilterStudents :students="students" />
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import studentInfo from '../api/student_info.json'
    // Components
    import FilterStudents from '../components/FilterStudents.vue'

    const students = ref([])

    onMounted(() => {
    students.value = studentInfo[0].students
    })
</script>
