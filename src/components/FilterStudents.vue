
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
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { StudentsList } from '../api/StudentsList';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';

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
</script>