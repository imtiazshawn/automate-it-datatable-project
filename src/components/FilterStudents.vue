
<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="students" paginator showGridlines :rows="10" dataKey="id"
                filterDisplay="menu" :loading="loading">
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>
            <template #empty> No students found. </template>
            <template #loading> Loading students data. Please wait. </template>
            <Column field="roll" header="Roll" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.roll }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Roll" />
                </template>
            </Column>
            <Column field="student_id" header="Student Id" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.student_id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Student Id" />
                </template>
            </Column>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Name" />
                </template>
            </Column>
            <Column field="academic_details.grade" header="Grade" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.academic_details.grade }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Grade" />
                </template>
            </Column>
            <Column field="academic_details.marks.math" header="Math" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.academic_details.marks.math }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Marks" />
                </template>
            </Column>
            <Column field="academic_details.marks.science" header="Science" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.academic_details.marks.science }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Marks" />
                </template>
            </Column>
            <Column field="academic_details.marks.english" header="English" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.academic_details.marks.english }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Marks" />
                </template>
            </Column>
            <Column field="guardian_details.contact" header="Contact" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.guardian_details.contact }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Contact Number" />
                </template>
            </Column>
        </DataTable>
        <div class="buttons">
            <Button type="button" @click="exportToExcel">Export Excel</Button>
            <Button type="button" @click="exportToPdf">Export Pdf</Button>
            <Button type="button" @click="checkConsole">Check Console</Button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { StudentsList } from '../api/StudentsList';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import * as XLSX from 'xlsx';
    import jsPDF from 'jspdf';
    import autoTable from 'jspdf-autotable';

    const students = ref();
    const filters = ref();
    const loading = ref(true);

    onMounted(() => {
        StudentsList.getStudentsListMedium().then((data) => {
            students.value = getStudents(data);
            loading.value = false;
        });
    });

    const initFilters = () => {
        filters.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            roll: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            student_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'academic_details.grade': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'academic_details.marks.math': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'academic_details.marks.science': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'academic_details.marks.english': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'guardian_details.contact': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        };
    };

    initFilters();

    const clearFilter = () => {
        initFilters();
    };

    const getStudents = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    // Check Console
    const checkConsole = () => {
        console.log(event.filteredValue);
    }

    // Export Excel
    const exportToExcel = () => {
        const data = students.value.map(student => ({
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

        const data = students.value.map(student => ({
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
</script>