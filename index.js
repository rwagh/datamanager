import insertRow from "./insert.js";
import selectRow from "./select.js";
import deleteRow from "./delete.js";
import updateRow from "./update.js";
import count from "./count.js";
import fields from "./fields.js"

export default {
  insert: insertRow,
  delete: deleteRow,
  select: selectRow,
  update: updateRow,
  count: count,
  fields: fields,
};
