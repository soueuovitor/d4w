(function($) {
	 /* 	
    $('#btn-toglle').change(function(){ 
        if (this.checked){

            $('#pago').fadeIn('slow');
            $( "#tipo_colab" ).val('Pago');
            $( "#nif_colaborador" ).val(0);
            $( "#salario_colaborador" ).val(50);
        }else{
            $('#pago').fadeOut('slow')
                $( "#tipo_colab" ).val('Voluntario'); 
                $( "#nif_colaborador" ).val(0);
                $( "#salario_colaborador" ).val(50);
    
          
        }
    });


     */
    
    var tipo = 1;
    $('#btn-tipo').click(function(e){ 
        
            $('#pago').fadeToggle();
            if(tipo == 2 ){
                 tipo = 1;
                $( "#tipo_colab" ).val('Voluntario'); 
                $( "#salario_colaborador" ).val(0);
                
            }else {
                 tipo = 2;
                $( "#tipo_colab" ).val('Pago');
                $( "#salario_colaborador" ).val(50);
               
            }
            $('#tipoVol').fadeToggle();
            $('#tipoPago').fadeToggle();
            $( "#nif_colaborador" ).val(0);
            
     
    });


     $('#btn-pago').click(function(e){ 
    $(' #btn-pago').fadeOut( function(){
        $('#pago, #btn-vol').fadeIn('fast');
        $( "#tipo_colab" ).val('Pago');
        $( "#nif_colaborador" ).val(0);
        $( "#salario_colaborador" ).val(50);
    });
});

    $('#btn-vol').click(function(e){    
        $('#pago, #btn-vol').fadeOut('0.00001', function(){
            $(' #btn-pago').fadeIn('fast');
            $( "#tipo_colab" ).val('Voluntario'); 
            $( "#nif_colaborador" ).val(0);
            $( "#salario_colaborador" ).val(50);

        });
    });
    $('#btn-change-login').click(function(e){ 
        
        $('#c-login').fadeToggle();
        $('#d-login').fadeToggle();
        $('#c-regi').fadeToggle();
        $('#d-regi').fadeToggle();
 
});


})(jQuery); // End of use strict

