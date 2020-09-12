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

      /*Evento al cambiar campo
      *En este caso si el campo es firstname o lastname asigna en el campo personalizado el valor
      *Adicional si intentan cambiar el campo codigo empleado no permite y envia mensaje
      */  
      function fieldChanged(Context) {
        //Entra solo si el campo es el firstname o lastname
        if(Context.fieldId === 'firstname' || Context.fieldId === 'lastname')
        {  
            var employee = Context.currentRecord;
            var identificacion = employee.getValue('entityid');
            employee.setValue('custentity_san_codigo_empleado', identificacion);		
        }

        if(Context.fieldId === 'custentity_san_codigo_empleado')
        {           
            //entra solo si el campo es el del codigo empleado                       
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
    
    //Función al guardar el registro
    //Si no tiene valor en fax coloca el telefono
    //ademas asigna valor al campo codigo empleado
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
