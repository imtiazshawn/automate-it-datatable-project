<script setup>
  import { ref, computed } from 'vue';
  import { defineProps } from 'vue';
  import * as XLSX from 'xlsx';
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';

  const props = defineProps(['students']);

  // Export Excel
  const exportToExcel = () => {
    const data = props.students.map(student => ({
      Roll: student.roll,
      'Student ID': student.student_id,
      Name: student.name,
      Grade: student.academic_details.grade,
      Math: student.academic_details.marks.math,
      Science: student.academic_details.marks.science,
      English: student.academic_details.marks.english,
      "Father's Name": student.guardian_details.father_name,
      "Mother's Name": student.guardian_details.mother_name,
      Relationship: student.guardian_details.relationship,
      Contact: student.guardian_details.contact
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    const filename = 'students.xlsx';
    XLSX.writeFile(wb, filename);
  };

  // Export PDF
  const exportToPdf = () => {
    const columns = [
      { title: 'Roll', dataKey: 'roll' },
      { title: 'Student ID', dataKey: 'student_id' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Grade', dataKey: 'academic_details.grade' },
      { title: 'Math', dataKey: 'academic_details.marks.math' },
      { title: 'Science', dataKey: 'academic_details.marks.science' },
      { title: 'English', dataKey: 'academic_details.marks.english' },
      { title: "Father's Name", dataKey: 'guardian_details.father_name' },
      { title: "Mother's Name", dataKey: 'guardian_details.mother_name' },
      { title: 'Relationship', dataKey: 'guardian_details.relationship' },
      { title: 'Contact', dataKey: 'guardian_details.contact' },
    ];

    const data = props.students.map(student => ({
      roll: student.roll,
      student_id: student.student_id,
      name: student.name,
      'academic_details.grade': student.academic_details.grade,
      'academic_details.marks.math': student.academic_details.marks.math,
      'academic_details.marks.science': student.academic_details.marks.science,
      'academic_details.marks.english': student.academic_details.marks.english,
      'guardian_details.father_name': student.guardian_details.father_name,
      'guardian_details.mother_name': student.guardian_details.mother_name,
      'guardian_details.relationship': student.guardian_details.relationship,
      'guardian_details.contact': student.guardian_details.contact,
    }));

    const pdf = new jsPDF();
    pdf.autoTable({
      head: [columns.map(column => column.title)],
      body: data.map(row => columns.map(column => row[column.dataKey])),
    });

    pdf.save('students.pdf');
  };

  const search = ref('');

  const filteredStudents = computed(() => {
    const searchTerm = search.value.toLowerCase();
    return props.students.filter(student => student.name.toLowerCase().includes(searchTerm));
  });
</script>


<template>
  <div class="card">
    <div class="search">
      <InputText v-model="search" placeholder="Search by Name"></InputText>
    </div>
    <DataTable 
      class="data_table" 
      v-model:filters="filters" 
      :value="filteredStudents" 
      :paginator="true" 
      rows="10" 
      tableStyle="min-width: 50rem"
      :globalFilterFields="['name', 'students.name']"
      style="margin-top: 1rem;"
    >
      <Column field="roll" header="Roll"></Column>
      <Column field="student_id" header="Student ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="academic_details.grade" header="Grade"></Column>
      <Column field="academic_details.marks.math" header="Math"></Column>
      <Column field="academic_details.marks.science" header="Science"></Column>
      <Column field="academic_details.marks.english" header="English"></Column>
      <Column field="guardian_details.father_name" header="Father's Name"></Column>
      <Column field="guardian_details.mother_name" header="Mother's Name"></Column>
      <Column field="guardian_details.relationship" header="Relationship"></Column>
      <Column field="guardian_details.contact" header="Contact" :filter="true"></Column>
    </DataTable>
    <div class="buttons">
      <Button type="button" @click="exportToExcel">Export Excel</Button>
      <Button type="button" @click="exportToPdf">Export Pdf</Button>
    </div>
  </div>
</template>

<style>
  .buttons {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
  }
</style>