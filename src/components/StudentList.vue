<script setup>
  import { defineProps } from 'vue';
  import * as XLSX from 'xlsx';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';

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

  // Export Pdf
  const exportToPdf = () => {
    const columns = [
      'Roll', 'Student ID', 'Name', 'Grade',
      'Math', 'Science', 'English',
      "Father's Name", "Mother's Name", 'Relationship', 'Contact'
    ];

    const data = props.students.map(student => ({
      'Roll': student.roll,
      'Student ID': student.student_id,
      'Name': student.name,
      'Grade': student.academic_details.grade,
      'Math': student.academic_details.marks.math,
      'Science': student.academic_details.marks.science,
      'English': student.academic_details.marks.english,
      "Father's Name": student.guardian_details.father_name,
      "Mother's Name": student.guardian_details.mother_name,
      'Relationship': student.guardian_details.relationship,
      'Contact': student.guardian_details.contact
    }));

    console.log('Data for PDF:', data);

    const doc = new jsPDF();
    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save('students.pdf');
  };

</script>


<template>
  <div class="card">
    <DataTable class="data_table" :value="students" :paginator="true" rows="10" tableStyle="min-width: 50rem">
      <Column field="roll" header="Roll" :filter="true"></Column>
      <Column field="student_id" header="Student ID" :filter="true"></Column>
      <Column field="name" header="Name" :filter="true"></Column>
      <Column field="academic_details.grade" header="Grade" :filter="true"></Column>
      <Column field="academic_details.marks.math" header="Math" :filter="true"></Column>
      <Column field="academic_details.marks.science" header="Science" :filter="true"></Column>
      <Column field="academic_details.marks.english" header="English" :filter="true"></Column>
      <Column field="guardian_details.father_name" header="Father's Name" :filter="true"></Column>
      <Column field="guardian_details.mother_name" header="Mother's Name" :filter="true"></Column>
      <Column field="guardian_details.relationship" header="Relationship" :filter="true"></Column>
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