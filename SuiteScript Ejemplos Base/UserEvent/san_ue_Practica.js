/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
**/
define(['N/record'],
	function(record){
		
		//Función que se ejecuta antes de enviar al servidor
		//En este caso si el telefono esta vacio envia uno por default
		function beforeSubmit(context)
		{
		    var employee = context.newRecord; //
			var empPhone = employee.getValue('phone');
			
			if(empPhone === "")
			{
				employee.setValue('phone','1111111111');
			}
			
			log.debug('Event Before Submit Employee Code: ',empPhone);

		
		};
		
		//Función que se ejecuta despues de enviar al servidor
		function afterSubmit(context)
		{
		    var employee = context.newRecord; //
			var empCode = employee.getValue('custentity_san_codigo_empleado');
			var empCurrency = employee.getValue('currency');
            var empCurrencyDesc = employee.getText('currency');
			
			log.debug('Event After Submit Employee Code: ',empCode);

		
		};
		
		//funcion que se realiza antes de cargar en pantalla el registro
		function beforeLoad(context)
		{
		    var employee = context.newRecord; //
			var empCode = employee.getValue('custentity_san_codigo_empleado');
			var empCurrency = employee.getValue('currency');
            var empCurrencyDesc = employee.getText('currency');
			
			log.debug('Event After Load Employee Code: ',empCode);
		
		};
	
	return {
            beforeLoad: beforeLoad,
            beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };

});

