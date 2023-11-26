<template>
  <div class="container">
    <div class="table">
      <SearchStudents :students="students" />
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import studentInfo from '../api/student_info.json'
    // Components
    import SearchStudents from '../components/SearchStudents.vue';

    const students = ref([])

    onMounted(() => {
    students.value = studentInfo[0].students
    })
</script>