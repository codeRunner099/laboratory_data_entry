const laborauftragDbName = "laborauftragDB";
const laborauftragStoreName = "laborauftraege";
const laborprobeStoreName = "proben";
const laborparameterStoreName = "probenparameter";
const laborauftragDbVersion = 2;

function oeffneLaborauftragDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(laborauftragDbName, laborauftragDbVersion);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(laborauftragStoreName)) {
                db.createObjectStore(laborauftragStoreName, { keyPath: "Id" });
            }
            if (!db.objectStoreNames.contains(laborprobeStoreName)) {
                db.createObjectStore(laborprobeStoreName, { keyPath: "Id" });
            }
            if (!db.objectStoreNames.contains(laborparameterStoreName)) {
                db.createObjectStore(laborparameterStoreName, { keyPath: "Id" });
            }
        };
    });
}

function dbHoleAlleLaborauftraege(db) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborauftragStoreName, "readonly");
        const store = tr.objectStore(laborauftragStoreName);
        const req = store.getAll();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result || []);
    });
}

function dbFuegeLaborauftragHinzu(db, eintrag) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborauftragStoreName, "readwrite");
        const store = tr.objectStore(laborauftragStoreName);
        const req = store.put(eintrag);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbEntferneLaborauftrag(db, id) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborauftragStoreName, "readwrite");
        const store = tr.objectStore(laborauftragStoreName);
        const req = store.delete(id);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbLoescheAlleLaborauftraege(db) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborauftragStoreName, "readwrite");
        const store = tr.objectStore(laborauftragStoreName);
        const req = store.clear();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbHoleAlleProben(db) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborprobeStoreName, "readonly");
        const store = tr.objectStore(laborprobeStoreName);
        const req = store.getAll();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result || []);
    });
}

function dbFuegeProbeHinzu(db, eintrag) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborprobeStoreName, "readwrite");
        const store = tr.objectStore(laborprobeStoreName);
        const req = store.put(eintrag);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbEntferneProbe(db, id) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborprobeStoreName, "readwrite");
        const store = tr.objectStore(laborprobeStoreName);
        const req = store.delete(id);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbLoescheAlleProben(db) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborprobeStoreName, "readwrite");
        const store = tr.objectStore(laborprobeStoreName);
        const req = store.clear();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbHoleAlleParameter(db) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborparameterStoreName, "readonly");
        const store = tr.objectStore(laborparameterStoreName);
        const req = store.getAll();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result || []);
    });
}

function dbFuegeParameterHinzu(db, eintrag) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborparameterStoreName, "readwrite");
        const store = tr.objectStore(laborparameterStoreName);
        const req = store.put(eintrag);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbEntferneParameter(db, id) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborparameterStoreName, "readwrite");
        const store = tr.objectStore(laborparameterStoreName);
        const req = store.delete(id);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

function dbLoescheAlleParameter(db) {
    return new Promise((resolve, reject) => {
        const tr = db.transaction(laborparameterStoreName, "readwrite");
        const store = tr.objectStore(laborparameterStoreName);
        const req = store.clear();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
    });
}

async function ladeLaborauftraege() {
    try {
        const db = await oeffneLaborauftragDb();
        const liste = await dbHoleAlleLaborauftraege(db);
        if (!Array.isArray(liste)) {
            return [];
        }
        return liste;
    } catch {
        return [];
    }
}

async function ladeProben() {
    try {
        const db = await oeffneLaborauftragDb();
        const liste = await dbHoleAlleProben(db);
        if (!Array.isArray(liste)) {
            return [];
        }
        return liste;
    } catch {
        return [];
    }
}

async function ladeParameter() {
    try {
        const db = await oeffneLaborauftragDb();
        const liste = await dbHoleAlleParameter(db);
        if (!Array.isArray(liste)) {
            return [];
        }
        return liste;
    } catch {
        return [];
    }
}

function erzeugeLeereTabellenanzeige() {
    const tbody = document.getElementById("laborauftragTableBody");
    tbody.innerHTML = "";
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.className = "laborauftrag-table-empty";
    td.textContent = "Noch keine Laboraufträge gespeichert.";
    tr.appendChild(td);
    tbody.appendChild(tr);
}

function erzeugeLeereProbeTabellenanzeige() {
    const tbody = document.getElementById("laborprobeTableBody");
    tbody.innerHTML = "";
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.className = "laborauftrag-table-empty";
    td.textContent = "Noch keine Proben gespeichert.";
    tr.appendChild(td);
    tbody.appendChild(tr);
}

function erzeugeLeereParameterTabellenanzeige() {
    const tbody = document.getElementById("laborparameterTableBody");
    tbody.innerHTML = "";
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.className = "laborauftrag-table-empty";
    td.textContent = "Noch keine Probenparameter gespeichert.";
    tr.appendChild(td);
    tbody.appendChild(tr);
}

function modalClose() {
    const backdrop = document.getElementById("laborModalBackdrop");
    if (backdrop) {
        backdrop.style.display = "none";
    }
}

function modalShow(title, html, buttons) {
    const titleEl = document.getElementById("laborModalTitle");
    const contentEl = document.getElementById("laborModalContent");
    const actionsEl = document.getElementById("laborModalActions");
    const backdrop = document.getElementById("laborModalBackdrop");
    if (!titleEl || !contentEl || !actionsEl || !backdrop) {
        return;
    }
    titleEl.textContent = title;
    contentEl.innerHTML = html;
    actionsEl.innerHTML = "";
    buttons.forEach(b => {
        actionsEl.appendChild(b);
    });
    backdrop.style.display = "flex";
}

function zeigeLaborauftragDetails(e) {
    const html =
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Id</span><span class="laborauftrag-modal-value">' + (e.Id || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Nummer</span><span class="laborauftrag-modal-value">' + (e.Nummer || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Auftraggeber</span><span class="laborauftrag-modal-value">' + (e.Auftraggeber || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Probenehmer</span><span class="laborauftrag-modal-value">' + (e.Probenehmer || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Bezeichnung</span><span class="laborauftrag-modal-value">' + (e.Bezeichnung || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Beschreibung</span><span class="laborauftrag-modal-value">' + (e.Beschreibung || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Created By</span><span class="laborauftrag-modal-value">' + (e.CreatedBy || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Created On</span><span class="laborauftrag-modal-value">' + (e.CreatedOn || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Change By</span><span class="laborauftrag-modal-value">' + (e.ChangeBy || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Change On</span><span class="laborauftrag-modal-value">' + (e.ChangeOn || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Info</span><span class="laborauftrag-modal-value">' + (e.Info || "") + "</span></div>";
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Schließen";
    closeBtn.className = "laborauftrag-button-secondary";
    closeBtn.onclick = modalClose;
    modalShow("Laborauftrag Details", html, [closeBtn]);
}

function zeigeProbeDetails(e) {
    const html =
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Id</span><span class="laborauftrag-modal-value">' + (e.Id || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">MasterID</span><span class="laborauftrag-modal-value">' + (e.MasterID || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Nummer</span><span class="laborauftrag-modal-value">' + (e.nummer || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Bezeichnung</span><span class="laborauftrag-modal-value">' + (e.bezeichnung || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Beschreibung</span><span class="laborauftrag-modal-value">' + (e.beschreibung || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Probenahme</span><span class="laborauftrag-modal-value">' + (e.probenahmeDatum || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Created By</span><span class="laborauftrag-modal-value">' + (e.createdBy || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Created On</span><span class="laborauftrag-modal-value">' + (e.createdOn || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Change By</span><span class="laborauftrag-modal-value">' + (e.changeBy || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Change On</span><span class="laborauftrag-modal-value">' + (e.changeOn || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Info</span><span class="laborauftrag-modal-value">' + (e.info || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">GeoID</span><span class="laborauftrag-modal-value">' + (e.GeoID || "") + "</span></div>";
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Schließen";
    closeBtn.className = "laborauftrag-button-secondary";
    closeBtn.onclick = modalClose;
    modalShow("Proben-Details", html, [closeBtn]);
}

function zeigeParameterDetails(e) {
    const html =
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Id</span><span class="laborauftrag-modal-value">' + (e.Id || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">MasterID</span><span class="laborauftrag-modal-value">' + (e.MasterID || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Name</span><span class="laborauftrag-modal-value">' + (e.name || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Methode</span><span class="laborauftrag-modal-value">' + (e.methode || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Ergebnis 1</span><span class="laborauftrag-modal-value">' + (e.ergebnis1 || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Ergebnis 2</span><span class="laborauftrag-modal-value">' + (e.ergebnis2 || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Ergebnis 3</span><span class="laborauftrag-modal-value">' + (e.ergebnis3 || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Masseinheit 1</span><span class="laborauftrag-modal-value">' + (e.masseinheit1 || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Masseinheit 2</span><span class="laborauftrag-modal-value">' + (e.masseinheit2 || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Masseinheit 3</span><span class="laborauftrag-modal-value">' + (e.masseinheit3 || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Created By</span><span class="laborauftrag-modal-value">' + (e.createdBy || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Created On</span><span class="laborauftrag-modal-value">' + (e.createdOn || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Change By</span><span class="laborauftrag-modal-value">' + (e.changeBy || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Change On</span><span class="laborauftrag-modal-value">' + (e.changeOn || "") + "</span></div>" +
        '<div class="laborauftrag-modal-row"><span class="laborauftrag-modal-label">Info</span><span class="laborauftrag-modal-value">' + (e.info || "") + "</span></div>";
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Schließen";
    closeBtn.className = "laborauftrag-button-secondary";
    closeBtn.onclick = modalClose;
    modalShow("Probenparameter Details", html, [closeBtn]);
}

function sendeLaborauftrag(e) {
    const ok = window.confirm("Diesen Laborauftrag senden?");
    if (!ok) return;
    alert("Laborauftrag gesendet: " + (e.Nummer || e.Id));
}

function sendeProbe(e) {
    const ok = window.confirm("Diese Probe senden?");
    if (!ok) return;
    alert("Probe gesendet: " + (e.nummer || e.Id));
}

function sendeParameter(e) {
    const ok = window.confirm("Diesen Probenparameter senden?");
    if (!ok) return;
    alert("Probenparameter gesendet: " + (e.name || e.Id));
}

function startEditLaborauftragRow(tr) {
    if (tr.dataset.editing === "1") return;
    tr.dataset.editing = "1";
    const felder = ["Nummer", "Auftraggeber", "Probenehmer", "Bezeichnung", "CreatedOn", "ChangeOn"];
    felder.forEach(feld => {
        const td = tr.querySelector('td[data-field="' + feld + '"]');
        if (!td) return;
        const input = document.createElement("input");
        input.value = td.textContent || "";
        td.innerHTML = "";
        td.appendChild(input);
    });
    const actions = tr.lastElementChild;
    actions.innerHTML = "";
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.textContent = "Speichern";
    saveBtn.className = "laborauftrag-button-table";
    saveBtn.dataset.action = "save";
    actions.appendChild(saveBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Abbrechen";
    cancelBtn.className = "laborauftrag-button-table";
    cancelBtn.style.marginLeft = "6px";
    cancelBtn.dataset.action = "cancel";
    actions.appendChild(cancelBtn);
}

async function saveEditLaborauftragRow(tr) {
    const id = tr.dataset.id;
    const db = await oeffneLaborauftragDb();
    const liste = await dbHoleAlleLaborauftraege(db);
    const eintrag = liste.find(x => String(x.Id) === String(id));
    if (!eintrag) return;
    const felder = ["Nummer", "Auftraggeber", "Probenehmer", "Bezeichnung", "CreatedOn", "ChangeOn"];
    felder.forEach(feld => {
        const td = tr.querySelector('td[data-field="' + feld + '"]');
        if (!td) return;
        const input = td.querySelector("input");
        const wert = input ? input.value.trim() : "";
        eintrag[feld] = wert;
    });
    await dbFuegeLaborauftragHinzu(db, eintrag);
    await aktualisiereTabelle();
}

async function cancelEditLaborauftragRow() {
    await aktualisiereTabelle();
}

function startEditProbeRow(tr) {
    if (tr.dataset.editing === "1") return;
    tr.dataset.editing = "1";
    const felder = ["MasterID", "nummer", "bezeichnung", "probenahmeDatum", "createdOn", "changeOn"];
    felder.forEach(feld => {
        const td = tr.querySelector('td[data-field="' + feld + '"]');
        if (!td) return;
        const input = document.createElement("input");
        input.value = td.textContent || "";
        td.innerHTML = "";
        td.appendChild(input);
    });
    const actions = tr.lastElementChild;
    actions.innerHTML = "";
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.textContent = "Speichern";
    saveBtn.className = "laborauftrag-button-table";
    saveBtn.dataset.action = "save";
    actions.appendChild(saveBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Abbrechen";
    cancelBtn.className = "laborauftrag-button-table";
    cancelBtn.style.marginLeft = "6px";
    cancelBtn.dataset.action = "cancel";
    actions.appendChild(cancelBtn);
}

async function saveEditProbeRow(tr) {
    const id = tr.dataset.id;
    const db = await oeffneLaborauftragDb();
    const liste = await dbHoleAlleProben(db);
    const eintrag = liste.find(x => String(x.Id) === String(id));
    if (!eintrag) return;
    const felder = ["MasterID", "nummer", "bezeichnung", "probenahmeDatum", "createdOn", "changeOn"];
    felder.forEach(feld => {
        const td = tr.querySelector('td[data-field="' + feld + '"]');
        if (!td) return;
        const input = td.querySelector("input");
        const wert = input ? input.value.trim() : "";
        eintrag[feld] = wert;
    });
    await dbFuegeProbeHinzu(db, eintrag);
    await aktualisiereProbeTabelle();
}

async function cancelEditProbeRow() {
    await aktualisiereProbeTabelle();
}

function startEditParameterRow(tr) {
    if (tr.dataset.editing === "1") return;
    tr.dataset.editing = "1";
    const felder = ["MasterID", "name", "methode", "ergebnis1", "ergebnis2", "ergebnis3", "masseinheit1", "masseinheit2", "masseinheit3", "createdOn", "changeOn"];
    felder.forEach(feld => {
        const td = tr.querySelector('td[data-field="' + feld + '"]');
        if (!td) return;
        const input = document.createElement("input");
        input.value = td.textContent || "";
        td.innerHTML = "";
        td.appendChild(input);
    });
    const actions = tr.lastElementChild;
    actions.innerHTML = "";
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.textContent = "Speichern";
    saveBtn.className = "laborauftrag-button-table";
    saveBtn.dataset.action = "save";
    actions.appendChild(saveBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Abbrechen";
    cancelBtn.className = "laborauftrag-button-table";
    cancelBtn.style.marginLeft = "6px";
    cancelBtn.dataset.action = "cancel";
    actions.appendChild(cancelBtn);
}

async function saveEditParameterRow(tr) {
    const id = tr.dataset.id;
    const db = await oeffneLaborauftragDb();
    const liste = await dbHoleAlleParameter(db);
    const eintrag = liste.find(x => String(x.Id) === String(id));
    if (!eintrag) return;
    const felder = ["MasterID", "name", "methode", "ergebnis1", "ergebnis2", "ergebnis3", "masseinheit1", "masseinheit2", "masseinheit3", "createdOn", "changeOn"];
    felder.forEach(feld => {
        const td = tr.querySelector('td[data-field="' + feld + '"]');
        if (!td) return;
        const input = td.querySelector("input");
        const wert = input ? input.value.trim() : "";
        eintrag[feld] = wert;
    });
    await dbFuegeParameterHinzu(db, eintrag);
    await aktualisiereParameterTabelle();
}

async function cancelEditParameterRow() {
    await aktualisiereParameterTabelle();
}

async function aktualisiereTabelle() {
    const liste = await ladeLaborauftraege();
    const tbody = document.getElementById("laborauftragTableBody");
    tbody.innerHTML = "";
    if (liste.length === 0) {
        erzeugeLeereTabellenanzeige();
        return;
    }
    liste.forEach(eintrag => {
        const tr = document.createElement("tr");
        tr.dataset.id = eintrag.Id;
        function cell(value, field) {
            const td = document.createElement("td");
            td.textContent = value || "";
            if (field) td.dataset.field = field;
            tr.appendChild(td);
        }
        cell(eintrag.Id);
        cell(eintrag.Nummer, "Nummer");
        cell(eintrag.Auftraggeber, "Auftraggeber");
        cell(eintrag.Probenehmer, "Probenehmer");
        cell(eintrag.Bezeichnung, "Bezeichnung");
        cell(eintrag.CreatedOn, "CreatedOn");
        cell(eintrag.ChangeOn, "ChangeOn");
        const tdAktionen = document.createElement("td");
        const detailsBtn = document.createElement("button");
        detailsBtn.type = "button";
        detailsBtn.textContent = "Details";
        detailsBtn.className = "laborauftrag-button-table";
        detailsBtn.dataset.action = "view";
        tdAktionen.appendChild(detailsBtn);
        const sendBtn = document.createElement("button");
        sendBtn.type = "button";
        sendBtn.textContent = "Senden";
        sendBtn.className = "laborauftrag-button-table";
        sendBtn.dataset.action = "send";
        sendBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(sendBtn);
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "Bearbeiten";
        editBtn.className = "laborauftrag-button-table";
        editBtn.dataset.action = "edit";
        editBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(editBtn);
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Löschen";
        delBtn.className = "laborauftrag-button-table";
        delBtn.dataset.action = "delete";
        delBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(delBtn);
        tr.appendChild(tdAktionen);
        tbody.appendChild(tr);
    });
}

async function aktualisiereProbeTabelle() {
    const liste = await ladeProben();
    const tbody = document.getElementById("laborprobeTableBody");
    tbody.innerHTML = "";
    if (liste.length === 0) {
        erzeugeLeereProbeTabellenanzeige();
        return;
    }
    liste.forEach(eintrag => {
        const tr = document.createElement("tr");
        tr.dataset.id = eintrag.Id;
        function cell(value, field) {
            const td = document.createElement("td");
            td.textContent = value || "";
            if (field) td.dataset.field = field;
            tr.appendChild(td);
        }
        cell(eintrag.Id);
        cell(eintrag.MasterID, "MasterID");
        cell(eintrag.nummer, "nummer");
        cell(eintrag.bezeichnung, "bezeichnung");
        cell(eintrag.probenahmeDatum, "probenahmeDatum");
        cell(eintrag.createdOn, "createdOn");
        cell(eintrag.changeOn, "changeOn");
        const tdAktionen = document.createElement("td");
        const detailsBtn = document.createElement("button");
        detailsBtn.type = "button";
        detailsBtn.textContent = "Details";
        detailsBtn.className = "laborauftrag-button-table";
        detailsBtn.dataset.action = "view";
        tdAktionen.appendChild(detailsBtn);
        const sendBtn = document.createElement("button");
        sendBtn.type = "button";
        sendBtn.textContent = "Senden";
        sendBtn.className = "laborauftrag-button-table";
        sendBtn.dataset.action = "send";
        sendBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(sendBtn);
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "Bearbeiten";
        editBtn.className = "laborauftrag-button-table";
        editBtn.dataset.action = "edit";
        editBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(editBtn);
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Löschen";
        delBtn.className = "laborauftrag-button-table";
        delBtn.dataset.action = "delete";
        delBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(delBtn);
        tr.appendChild(tdAktionen);
        tbody.appendChild(tr);
    });
}

async function aktualisiereParameterTabelle() {
    const liste = await ladeParameter();
    const tbody = document.getElementById("laborparameterTableBody");
    tbody.innerHTML = "";
    if (liste.length === 0) {
        erzeugeLeereParameterTabellenanzeige();
        return;
    }
    liste.forEach(eintrag => {
        const tr = document.createElement("tr");
        tr.dataset.id = eintrag.Id;
        function cell(value, field) {
            const td = document.createElement("td");
            td.textContent = value || "";
            if (field) td.dataset.field = field;
            tr.appendChild(td);
        }
        cell(eintrag.Id);
        cell(eintrag.MasterID, "MasterID");
        cell(eintrag.name, "name");
        cell(eintrag.methode, "methode");
        cell(eintrag.ergebnis1, "ergebnis1");
        cell(eintrag.ergebnis2, "ergebnis2");
        cell(eintrag.ergebnis3, "ergebnis3");
        const tdAktionen = document.createElement("td");
        const detailsBtn = document.createElement("button");
        detailsBtn.type = "button";
        detailsBtn.textContent = "Details";
        detailsBtn.className = "laborauftrag-button-table";
        detailsBtn.dataset.action = "view";
        tdAktionen.appendChild(detailsBtn);
        const sendBtn = document.createElement("button");
        sendBtn.type = "button";
        sendBtn.textContent = "Senden";
        sendBtn.className = "laborauftrag-button-table";
        sendBtn.dataset.action = "send";
        sendBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(sendBtn);
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "Bearbeiten";
        editBtn.className = "laborauftrag-button-table";
        editBtn.dataset.action = "edit";
        editBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(editBtn);
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Löschen";
        delBtn.className = "laborauftrag-button-table";
        delBtn.dataset.action = "delete";
        delBtn.style.marginLeft = "6px";
        tdAktionen.appendChild(delBtn);
        tr.appendChild(tdAktionen);
        tbody.appendChild(tr);
    });
}

function leseFormular() {
    const id = document.getElementById("laborauftragId").value.trim();
    if (!id) return null;
    const nummer = document.getElementById("laborauftragNummer").value.trim();
    const auftraggeber = document.getElementById("laborauftragAuftraggeber").value.trim();
    const probenehmer = document.getElementById("laborauftragProbenehmer").value.trim();
    const bezeichnung = document.getElementById("laborauftragBezeichnung").value.trim();
    const beschreibung = document.getElementById("laborauftragBeschreibung").value.trim();
    const createdBy = document.getElementById("laborauftragCreatedBy").value.trim();
    const createdOn = document.getElementById("laborauftragCreatedOn").value;
    const changeBy = document.getElementById("laborauftragChangeBy").value.trim();
    const changeOn = document.getElementById("laborauftragChangeOn").value;
    const info = document.getElementById("laborauftragInfo").value.trim();
    return {
        Id: id,
        Nummer: nummer,
        Auftraggeber: auftraggeber,
        Probenehmer: probenehmer,
        Bezeichnung: bezeichnung,
        Beschreibung: beschreibung,
        CreatedBy: createdBy,
        CreatedOn: createdOn,
        ChangeBy: changeBy,
        ChangeOn: changeOn,
        Info: info
    };
}

function leseProbeFormular() {
    const id = document.getElementById("laborprobeId").value.trim();
    if (!id) return null;
    const masterId = document.getElementById("laborprobeMasterId").value.trim();
    const nummer = document.getElementById("laborprobeNummer").value.trim();
    const bezeichnung = document.getElementById("laborprobeBezeichnung").value.trim();
    const beschreibung = document.getElementById("laborprobeBeschreibung").value.trim();
    const probenahmeDatum = document.getElementById("laborprobeProbenahmeDatum").value;
    const createdBy = document.getElementById("laborprobeCreatedBy").value.trim();
    const createdOn = document.getElementById("laborprobeCreatedOn").value;
    const changeBy = document.getElementById("laborprobeChangeBy").value.trim();
    const changeOn = document.getElementById("laborprobeChangeOn").value;
    const info = document.getElementById("laborprobeInfo").value.trim();
    const geoId = document.getElementById("laborprobeGeoId").value.trim();
    return {
        Id: id,
        MasterID: masterId,
        nummer: nummer,
        bezeichnung: bezeichnung,
        beschreibung: beschreibung,
        probenahmeDatum: probenahmeDatum,
        createdBy: createdBy,
        createdOn: createdOn,
        changeBy: changeBy,
        changeOn: changeOn,
        info: info,
        GeoID: geoId
    };
}

function leseParameterFormular() {
    const id = document.getElementById("laborparameterId").value.trim();
    if (!id) return null;
    const masterId = document.getElementById("laborparameterMasterId").value.trim();
    const name = document.getElementById("laborparameterName").value.trim();
    const methode = document.getElementById("laborparameterMethode").value.trim();
    const ergebnis1 = document.getElementById("laborparameterErgebnis1").value.trim();
    const ergebnis2 = document.getElementById("laborparameterErgebnis2").value.trim();
    const ergebnis3 = document.getElementById("laborparameterErgebnis3").value.trim();
    const masseinheit1 = document.getElementById("laborparameterMasseinheit1").value.trim();
    const masseinheit2 = document.getElementById("laborparameterMasseinheit2").value.trim();
    const masseinheit3 = document.getElementById("laborparameterMasseinheit3").value.trim();
    const createdBy = document.getElementById("laborparameterCreatedBy").value.trim();
    const createdOn = document.getElementById("laborparameterCreatedOn").value;
    const changeBy = document.getElementById("laborparameterChangeBy").value.trim();
    const changeOn = document.getElementById("laborparameterChangeOn").value;
    const info = document.getElementById("laborparameterInfo").value.trim();
    return {
        Id: id,
        MasterID: masterId,
        name: name,
        methode: methode,
        ergebnis1: ergebnis1,
        ergebnis2: ergebnis2,
        ergebnis3: ergebnis3,
        masseinheit1: masseinheit1,
        masseinheit2: masseinheit2,
        masseinheit3: masseinheit3,
        createdBy: createdBy,
        createdOn: createdOn,
        changeBy: changeBy,
        changeOn: changeOn,
        info: info
    };
}

function loescheFormular() {
    document.getElementById("laborauftragForm").reset();
}

function loescheProbeFormular() {
    document.getElementById("laborprobeForm").reset();
}

function loescheParameterFormular() {
    document.getElementById("laborparameterForm").reset();
}

async function fuegeLaborauftragHinzu(eintrag) {
    try {
        const db = await oeffneLaborauftragDb();
        await dbFuegeLaborauftragHinzu(db, eintrag);
        await aktualisiereTabelle();
    } catch {
        alert("Speichern nicht möglich.");
    }
}

async function fuegeProbeHinzu(eintrag) {
    try {
        const db = await oeffneLaborauftragDb();
        await dbFuegeProbeHinzu(db, eintrag);
        await aktualisiereProbeTabelle();
    } catch {
        alert("Speichern nicht möglich.");
    }
}

async function fuegeParameterHinzu(eintrag) {
    try {
        const db = await oeffneLaborauftragDb();
        await dbFuegeParameterHinzu(db, eintrag);
        await aktualisiereParameterTabelle();
    } catch {
        alert("Speichern nicht möglich.");
    }
}

async function entferneLaborauftrag(id) {
    try {
        const db = await oeffneLaborauftragDb();
        await dbEntferneLaborauftrag(db, id);
        await aktualisiereTabelle();
    } catch {
        alert("Löschen nicht möglich.");
    }
}

async function entferneProbe(id) {
    try {
        const db = await oeffneLaborauftragDb();
        await dbEntferneProbe(db, id);
        await aktualisiereProbeTabelle();
    } catch {
        alert("Löschen nicht möglich.");
    }
}

async function entferneParameter(id) {
    try {
        const db = await oeffneLaborauftragDb();
        await dbEntferneParameter(db, id);
        await aktualisiereParameterTabelle();
    } catch {
        alert("Löschen nicht möglich.");
    }
}

async function exportiereAlsJson() {
    const liste = await ladeLaborauftraege();
    const daten = JSON.stringify(liste, null, 2);
    const blob = new Blob([daten], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const datum = new Date().toISOString().replace(/[:.]/g, "-");
    link.href = url;
    link.download = "laborauftraege_" + datum + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function exportiereProbenAlsJson() {
    const liste = await ladeProben();
    const daten = JSON.stringify(liste, null, 2);
    const blob = new Blob([daten], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const datum = new Date().toISOString().replace(/[:.]/g, "-");
    link.href = url;
    link.download = "proben_" + datum + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function exportiereParameterAlsJson() {
    const liste = await ladeParameter();
    const daten = JSON.stringify(liste, null, 2);
    const blob = new Blob([daten], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const datum = new Date().toISOString().replace(/[:.]/g, "-");
    link.href = url;
    link.download = "probenparameter_" + datum + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function loescheAlleLaborauftraege() {
    const bestaetigt = window.confirm("Alle gespeicherten Laboraufträge wirklich löschen?");
    if (!bestaetigt) return;
    try {
        const db = await oeffneLaborauftragDb();
        await dbLoescheAlleLaborauftraege(db);
        await aktualisiereTabelle();
    } catch {
        alert("Löschen nicht möglich.");
    }
}

async function loescheAlleProben() {
    const bestaetigt = window.confirm("Alle gespeicherten Proben wirklich löschen?");
    if (!bestaetigt) return;
    try {
        const db = await oeffneLaborauftragDb();
        await dbLoescheAlleProben(db);
        await aktualisiereProbeTabelle();
    } catch {
        alert("Löschen nicht möglich.");
    }
}

async function loescheAlleParameter() {
    const bestaetigt = window.confirm("Alle gespeicherten Probenparameter wirklich löschen?");
    if (!bestaetigt) return;
    try {
        const db = await oeffneLaborauftragDb();
        await dbLoescheAlleParameter(db);
        await aktualisiereParameterTabelle();
    } catch {
        alert("Löschen nicht möglich.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const formular = document.getElementById("laborauftragForm");
    const exportButton = document.getElementById("laborauftragExportButton");
    const clearButton = document.getElementById("laborauftragClearButton");
    const resetButton = document.getElementById("laborauftragResetButton");

    const probeFormular = document.getElementById("laborprobeForm");
    const probeExportButton = document.getElementById("laborprobeExportButton");
    const probeClearButton = document.getElementById("laborprobeClearButton");
    const probeResetButton = document.getElementById("laborprobeResetButton");

    const parameterFormular = document.getElementById("laborparameterForm");
    const parameterExportButton = document.getElementById("laborparameterExportButton");
    const parameterClearButton = document.getElementById("laborparameterClearButton");
    const parameterResetButton = document.getElementById("laborparameterResetButton");

    const laborauftragTbody = document.getElementById("laborauftragTableBody");
    const laborprobeTbody = document.getElementById("laborprobeTableBody");
    const laborparameterTbody = document.getElementById("laborparameterTableBody");

    formular.addEventListener("submit", event => {
        event.preventDefault();
        const eintrag = leseFormular();
        if (!eintrag) {
            alert("Bitte eine Id eingeben.");
            return;
        }
        fuegeLaborauftragHinzu(eintrag);
        loescheFormular();
    });

    probeFormular.addEventListener("submit", event => {
        event.preventDefault();
        const eintrag = leseProbeFormular();
        if (!eintrag) {
            alert("Bitte eine Id eingeben.");
            return;
        }
        fuegeProbeHinzu(eintrag);
        loescheProbeFormular();
    });

    parameterFormular.addEventListener("submit", event => {
        event.preventDefault();
        const eintrag = leseParameterFormular();
        if (!eintrag) {
            alert("Bitte eine Id eingeben.");
            return;
        }
        fuegeParameterHinzu(eintrag);
        loescheParameterFormular();
    });

    exportButton.addEventListener("click", () => {
        exportiereAlsJson();
    });
    clearButton.addEventListener("click", () => {
        loescheAlleLaborauftraege();
    });
    resetButton.addEventListener("click", () => {
        loescheFormular();
    });

    probeExportButton.addEventListener("click", () => {
        exportiereProbenAlsJson();
    });
    probeClearButton.addEventListener("click", () => {
        loescheAlleProben();
    });
    probeResetButton.addEventListener("click", () => {
        loescheProbeFormular();
    });

    parameterExportButton.addEventListener("click", () => {
        exportiereParameterAlsJson();
    });
    parameterClearButton.addEventListener("click", () => {
        loescheAlleParameter();
    });
    parameterResetButton.addEventListener("click", () => {
        loescheParameterFormular();
    });

    laborauftragTbody.addEventListener("click", async e => {
        const btn = e.target;
        const action = btn.dataset.action;
        if (!action) return;
        const tr = btn.closest("tr");
        if (!tr || !tr.dataset.id) return;
        const id = tr.dataset.id;
        const liste = await ladeLaborauftraege();
        const eintrag = liste.find(x => String(x.Id) === String(id));
        if (!eintrag) return;
        if (action === "view") zeigeLaborauftragDetails(eintrag);
        if (action === "send") sendeLaborauftrag(eintrag);
        if (action === "edit") startEditLaborauftragRow(tr);
        if (action === "save") saveEditLaborauftragRow(tr);
        if (action === "cancel") cancelEditLaborauftragRow();
        if (action === "delete") entferneLaborauftrag(eintrag.Id);
    });

    laborprobeTbody.addEventListener("click", async e => {
        const btn = e.target;
        const action = btn.dataset.action;
        if (!action) return;
        const tr = btn.closest("tr");
        if (!tr || !tr.dataset.id) return;
        const id = tr.dataset.id;
        const liste = await ladeProben();
        const eintrag = liste.find(x => String(x.Id) === String(id));
        if (!eintrag) return;
        if (action === "view") zeigeProbeDetails(eintrag);
        if (action === "send") sendeProbe(eintrag);
        if (action === "edit") startEditProbeRow(tr);
        if (action === "save") saveEditProbeRow(tr);
        if (action === "cancel") cancelEditProbeRow();
        if (action === "delete") entferneProbe(eintrag.Id);
    });

    laborparameterTbody.addEventListener("click", async e => {
        const btn = e.target;
        const action = btn.dataset.action;
        if (!action) return;
        const tr = btn.closest("tr");
        if (!tr || !tr.dataset.id) return;
        const id = tr.dataset.id;
        const liste = await ladeParameter();
        const eintrag = liste.find(x => String(x.Id) === String(id));
        if (!eintrag) return;
        if (action === "view") zeigeParameterDetails(eintrag);
        if (action === "send") sendeParameter(eintrag);
        if (action === "edit") startEditParameterRow(tr);
        if (action === "save") saveEditParameterRow(tr);
        if (action === "cancel") cancelEditParameterRow();
        if (action === "delete") entferneParameter(eintrag.Id);
    });

    const backdrop = document.getElementById("laborModalBackdrop");
    if (backdrop) {
        backdrop.addEventListener("click", e => {
            if (e.target.id === "laborModalBackdrop") {
                modalClose();
            }
        });
    }

    aktualisiereTabelle();
    aktualisiereProbeTabelle();
    aktualisiereParameterTabelle();
});
