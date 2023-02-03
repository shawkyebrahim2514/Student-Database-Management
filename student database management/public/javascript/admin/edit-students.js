function updateColumnList() {
    const tableName = document.getElementById("tableName").value;
    const columnName = document.getElementById("columnName");
    columnName.innerHTML = "";

    if (tableName === "students") {
        showStudentsColumns(columnName)
    } else if (tableName === "personalData") {
        showPersonalColumns(columnName)
    } else if (tableName === "academicData") {
        showAcademicColumns(columnName)
    }
}

function showStudentsColumns(columnName) {
    const option1 = document.createElement("option");
    option1.value = "password";
    option1.text = "password";
    columnName.add(option1);
}

function showPersonalColumns(columnName) {
    const option1 = document.createElement("option");
    option1.value = "firstName";
    option1.text = "firstName";
    columnName.add(option1);

    const option2 = document.createElement("option");
    option2.value = "lastName";
    option2.text = "lastName";
    columnName.add(option2);
}

function showAcademicColumns(columnName) {
    const option1 = document.createElement("option");
    option1.value = "level";
    option1.text = "level";
    columnName.add(option1);

    const option2 = document.createElement("option");
    option2.value = "GPA";
    option2.text = "GPA";
    columnName.add(option2);
}

function updateTypeList() {
    const columnName = document.getElementById("columnName").value;
    const typeName = document.getElementById("updateValueType");
    typeName.innerHTML = "";
    const option = document.createElement("option");
    if (columnName === "password" || columnName === "firstName" || columnName === "lastName") {
        option.value = "string";
        option.text = "string";
    } else if (columnName === "GPA" || columnName === "level") {
        option.value = "integer";
        option.text = "integer";
    }
    typeName.add(option);
}