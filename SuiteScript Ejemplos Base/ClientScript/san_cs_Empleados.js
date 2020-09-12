/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/ui/message'],

function(runtime, message) {
    
    function pageInit(Context) {
        //currentMode = Context.mode;
       
      }

      function fieldChanged(Context) {

        if(Context.fieldId === 'firstname' || Context.fieldId === 'lastname')
        {  
            var employee = Context.currentRecord;
            var identificacion = employee.getValue('entityid');
            employee.setValue('custentity_san_codigo_empleado', identificacion);		
        }

        if(Context.fieldId === 'custentity_san_codigo_empleado')
        {           
                                   
            var employee = Context.currentRecord;
            var nombre = employee.getValue('firstname');
            var apellido = employee.getValue('lastname');
            var codigo = nombre + ' ' + apellido;
            var codigoEmpleado =employee.getValue('custentity_san_codigo_empleado');
            if(codigoEmpleado != codigo)
            {
                employee.setValue('custentity_san_codigo_empleado', codigo);	
                var myMsg = message.create({
                    title: "Alerta",
                    message: "No se puede editar este campo",
                    type: message.Type.ERROR,                                
                    duration: 10000
                });
    
                myMsg.show();
                
            }
        }
    }

    function saveRecord(Context) {
        var employee = Context.currentRecord;

        var fax = employee.getValue('fax');

        if(!fax)
        {
            var phone = employee.getValue('phone');
            employee.setValue('fax',phone);
        }

        var nombre = employee.getValue('firstname');
        var apellido = employee.getValue('lastname');
        var codigo = nombre + ' ' + apellido;
        employee.setValue('custentity_san_codigo_empleado', codigo);
        

        
        return true;

    }

    return {
        
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        /*
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,*/
        saveRecord: saveRecord
    };
    
});
