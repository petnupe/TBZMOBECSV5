        $(document).ready(function() {
            console.log('iniciando o app');
        });


        // Wait for device API libraries to load
        //


        function sair() {
            navigator.app.exitApp();
        }

        function controlBackButton() {
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        // device APIs are available
        //
        function onDeviceReady() {
            document.addEventListener("backbutton", onBackKeyDown, false);
        }
        var c = 0;

        $(document).on("click", "#vf", function() {
            c = 1;
        });
        
        $(document).on("click", "#bMenu", function() {

            document.getElementById('aut').value = '';
            document.getElementById('valor').value = '';
            document.getElementById('parcelas').value = '';
            document.getElementById('cartao').value = '6298 69';
            if (c > 0) {
                document.getElementById('mes').value = '0';
                $('select').selectmenu('refresh');
                c = 0;
            }

            $.mobile.navigate("#menupage");

        });

        function onBackKeyDown() {
            document.getElementById('aut').value = '';
            document.getElementById('valor').value = '';
            document.getElementById('parcelas').value = '';
            document.getElementById('cartao').value = '6298 69';
            if (c > 0) {
                document.getElementById('mes').value = '0';
                $('select').selectmenu('refresh');
                c = 0;
            }

            $.mobile.navigate("#menupage");
        }

        function SomenteNumero(e) {
            var tecla = (window.event) ? event.keyCode : e.which;
            if ((tecla > 47 && tecla < 58)) return true;
            else {
                if (tecla == 8 || tecla == 0) return true;
                else return false;
            }
        }

        $(function() {

            $("#bentrar").click(function() {

                var ecs_value = document.getElementById('codecs').value;
                var sen_value = document.getElementById('senecs').value;

                if (ecs_value.length > 0 && sen_value.length > 0) {

                    if (document.getElementById('checkLogin').checked) {
                        $.localStorage.set('ecs_ls', ecs_value);
                        $.localStorage.set('sen_ls', sen_value);
                        $.localStorage.set('check_ls', 1);
                    } else {
                        $.localStorage.removeAll();
                    }



                    $.support.cors = true;
                    $.ajax({
                        url: "http://www2.tecbiz.com.br/tecbiz/tecbiz.php",
                        data: {
                            a: "725d5b",
                            ecs: ecs_value,
                            sen: sen_value,
                            acs: "1"
                        },
                        dataType: "xml",
                        type: "GET",
                        async: true,
                        cache: false,
                        context: jQuery('#resultado'),
                        beforeSend: function() {
                            $.mobile.loading("show", {
                                text: "Aguarde...",
                                textVisible: true,
                                theme: "a",
                                html: ""
                            });
                        },
                        success: function(context) {
                            // handle result
                            var dados = new Array();
                            var node = context.getElementsByTagName("node");

                            for (i = 0; i < node.length; i++) {

                                if (context.getElementsByTagName("node")[i].childNodes[0].childNodes[0] !== undefined) {

                                    dados[i] = context.getElementsByTagName("node")[i].childNodes[0].childNodes[0].nodeValue;

                                }

                            }
                            if (dados[0] == 92) {
                                alertaLoginErro(dados[1]);
                                $.mobile.loading("hide");
                            } else {
                                $.mobile.navigate("#menupage");
                                $.mobile.loading("hide");
                            }

                        },
                        error: function(request, status, error) {
                            // Volta o botão de submit

                            $.mobile.loading('hide');
                            // E alerta o erro
                            alert('Problema de conexão!');
                        }
                    });

                } else {
                    alertaCamposVazios();
                }

            });
        });

        //Funções Tela Cartão
        $(document).on("click", "#bavancar_cartao", function() {

            cartao = document.getElementById('cartao').value;

            if (cartao.length == 19) {
                $.mobile.navigate("#vendapage");
            } else {
                alertaCartaoIncompleto();
            }

        });

        $(document).on("click", "#blimpar_cartao", function() {

            var cartao = document.getElementById('cartao');
            cartao.value = "6298 69";

        });

        //Tela Vencimento
        $(document).on("click", "#bavancar_venc", function() {
            $.mobile.navigate("#cartaopage");
        });

        //Tela venda
        $(document).on("click", "#blimpar_venda", function() {
            var valor = document.getElementById('valor');
            valor.value = "";
            var parcelas = document.getElementById('parcelas');
            parcelas.value = "";
        });


        function venda() {
            var ecs_value = document.getElementById('codecs').value;
            var sen_value = document.getElementById('senecs').value;
            var valor_value = document.getElementById('valor').value;
            var parcelas_value = document.getElementById('parcelas').value;
            var cartao_value = document.getElementById('cartao').value;
            var mesven_value = document.getElementById('mes').value;
            if (valor_value.length > 0 && parcelas_value.length > 0) {
                valor_value = valor_value.replace(',', '');
                valor_value = valor_value.replace('.', '');
                cartao_value = cartao_value.replace(' ', '');
                cartao_value = cartao_value.replace(' ', '');
                cartao_value = cartao_value.replace(' ', '');

                $.support.cors = true;
                $.ajax({
                    url: "http://www2.tecbiz.com.br/tecbiz/tecbiz.php",
                    data: {
                        a: "725d5b",
                        ope: 'MOBILE',
                        car: cartao_value,
                        ecs: ecs_value,
                        sen: sen_value,
                        val: valor_value,
                        par: parcelas_value,
                        mes: mesven_value,
                        acs: "2"
                    },
                    dataType: "xml",
                    type: "GET",
                    async: true,
                    cache: false,
                    context: jQuery('#resultado'),
                    beforeSend: function() {
                        $.mobile.loading("show", {text: "Aguarde...", textVisible: true, theme: "a", html: ""});
                    },
                    
                    success: function(context) {
                        var dados = new Array();
                        var node = context.getElementsByTagName("node");

                        for (i = 0; i < node.length; i++) {
                            if (context.getElementsByTagName("node")[i].childNodes[0].childNodes[0] !== undefined) {
                                dados[i] = context.getElementsByTagName("node")[i].childNodes[0].childNodes[0].nodeValue;
                            }
                        }

                        if (dados[0].length > 2) {
                            $('#numaut').text(dados[0]);
                            $('#etd').text(dados[1]);
                            $('#ass').text(dados[2]);
                            $('#port').text(dados[3]);
                            $('#car').text(dados[4]);
                            $('#par').text('X' + dados[7]);
                            $('#valort').text('R$' + dados[8]);
                            $('#parcprim').text('R$' + dados[5]);
                            $('#parcout').text('R$' + dados[6]);
                            $('#mesven').text(dados[11]);
                            $('#ecsnom').text(dados[13]);
                            $('#cnpj').text(dados[14]);
                            $('#data').text(dados[15]);
                            $('#hora').text(dados[16]);
                            $.mobile.navigate('#vendaconcluida');
                        } else {
                            mostraErros(dados[1]);
                            $.mobile.loading('hide');
                        }
                    },
                    error: function(request, status, error) {
                        $.mobile.loading('hide');
                        alert('Problema de conexão!');
                    }
                });

            } else {
                alert('erro');
            }

        };



        //Tela Consulta
        $(document).on("click", "#blimpar_cons", function() {

            var aut = document.getElementById('aut');
            aut.value = "";

        });


        //Funções Tela Venda
        $(document).on("click", "#bavancar_cons", function() {

            console.log('clicando');
            var ecs_value = document.getElementById('codecs').value;
            var sen_value = document.getElementById('senecs').value;
            var aut_value = document.getElementById('aut').value;

            if (!aut_value.length) {
                aut_value = "0"
            }

            $.support.cors = true;
            $.ajax({
                url: "http://www2.tecbiz.com.br/tecbiz/tecbiz.php",
                data: {
                    a: "725d5b",
                    ecs: ecs_value,
                    sen: sen_value,
                    aut: aut_value,
                    acs: "3"
                },
                dataType: "xml",
                type: "GET",
                async: true,
                cache: false,
                context: jQuery('#resultado'),
                beforeSend: function() {
                    $.mobile.loading("show", {text: "Aguarde...", textVisible: true, theme: "a", html: ""});
                },
                success: function(context) {
                    // handle result
                    var dados = new Array();
                    var node = context.getElementsByTagName("node");

                    for (i = 0; i < node.length; i++) {
                        if (context.getElementsByTagName("node")[i].childNodes[0].childNodes[0] !== undefined) {
                            dados[i] = context.getElementsByTagName("node")[i].childNodes[0].childNodes[0].nodeValue;
                        }
                   }
                    var auth = document.getElementById('authidden');
                    auth.value = dados[0];

                    if (dados[0].length > 2) {
                        $('#cnumaut').text(dados[0]);
                        if (dados[2] == 'ESTORNADA') {
                            $('#cstatus').css("color", "red");
                            $('#bestornar_cons').css("visibility", "hidden");

                        } else {
                            $('#cstatus').css("color", "green");
                            $('#bestornar_cons').css("visibility", "visible");
                        }

                        $('#cstatus').text(dados[2]);
                        $('#cetd').text(dados[3]);
                        $('#cass').text(dados[4]);
                        $('#cport').text(dados[5]);
                        $('#ccar').text(dados[6]);
                        $('#cpar').text('X' + dados[9]);
                        $('#cvalort').text('R$' + dados[10]);
                        $('#cparcprim').text('R$' + dados[7]);
                        $('#cparcout').text('R$' + dados[8]);
                        $('#cmesven').text(dados[12]);
                        $('#cdata').text(dados[13]);
                        $('#chora').text(dados[14]);
                        $.mobile.navigate('#consconcluida');

                    } else {
                        mostraErros(dados[1]);
                        $.mobile.loading('hide');
                    }

                },
                error: function(request, status, error) {
                    // Volta o botão de submit

                    $.mobile.loading('hide');
                    // E alerta o erro
                    alert('Problema de conexão!');
                }
            });
        });

        $(document).on("click", "#bavancar_venda", function() {
            var ecs_value = document.getElementById('codecs').value;
            var sen_value = document.getElementById('senecs').value;
            var valor_value = document.getElementById('valor').value;
            var parcelas_value = document.getElementById('parcelas').value;
            var cartao_value = document.getElementById('cartao').value;
            var mesven_value = document.getElementById('mes').value;

            if (valor_value.length > 0 && parcelas_value.length > 0) {
                if (mesven_value == 0) {
                    mesvencimento = 'Mês Atual';
                }
                if (mesven_value == 1) {
                    mesvencimento = 'Janeiro';
                }
                if (mesven_value == 2) {
                    mesvencimento = 'Fevereiro';
                }
                if (mesven_value == 3) {
                    mesvencimento = 'Março';
                }
                if (mesven_value == 4) {
                    mesvencimento = 'Abril';
                }
                if (mesven_value == 5) {
                    mesvencimento = 'Maio';
                }
                if (mesven_value == 6) {
                    mesvencimento = 'Junho';
                }
                if (mesven_value == 7) {
                    mesvencimento = 'Julho';
                }
                if (mesven_value == 8) {
                    mesvencimento = 'Agosto';
                }
                if (mesven_value == 9) {
                    mesvencimento = 'Setembro';
                }
                if (mesven_value == 10) {
                    mesvencimento = 'Outubro';
                }
                if (mesven_value == 11) {
                    mesvencimento = 'Novembro';
                }
                if (mesven_value == 12) {
                    mesvencimento = 'Dezembro';
                }
                navigator.notification.confirm ('CARTÃO: ' + cartao_value + '\n\nVALOR TOTAL: ' + valor_value + '\n\nPARCELAS: X' + parcelas_value + '\n\nVENCIMENTO: ' + mesvencimento, confirmaVenda, 'Confirma a autorização?', ['Não', 'Sim']);
            } else {
                alertaCamposVazios();
            }
        });

        $(document).on("click", "#bestornar_cons", function() {
            navigator.notification.confirm('Deseja estornar esta venda?', confirmaEstorno, 'Confirmação Estorno', ['Não', 'Sim'])
        });

        function estornar() {
            var ecs_value = document.getElementById('codecs').value;
            var sen_value = document.getElementById('senecs').value;
            var aut_value_cons = '';
            var aut_value_cons = document.getElementById('authidden').value;

            $.support.cors = true;
            $.ajax({
                url: "http://www2.tecbiz.com.br/tecbiz/tecbiz.php",
                data: {
                    a: "725d5b",
                    ecs: ecs_value,
                    sen: sen_value,
                    aut: aut_value_cons,
                    acs: "4"
                },
                dataType: "xml",
                type: "GET",
                async: true,
                cache: false,
                context: jQuery('#resultado'),
                beforeSend: function() {
                    $.mobile.loading("show", {
                        text: "Aguarde...",
                        textVisible: true,
                        theme: "a",
                        html: ""
                    });
                },
                success: function(context) {
                    var dados2 = new Array();
                    var node2 = context.getElementsByTagName("node");

                    for (i = 0; i < node2.length; i++) {
                        if (context.getElementsByTagName("node")[i].childNodes[0].childNodes[0] !== undefined) {
                            dados2[i] = context.getElementsByTagName("node")[i].childNodes[0].childNodes[0].nodeValue;
                        }
                    }

                    if (dados2[0].length > 2) {
                        alertaEstSucesso();
                        $.mobile.loading('hide');
                        $.mobile.navigate('#menupage');
                    } else {
                        mostraErros(dados2[1]);
                        $.mobile.loading('hide');
                        $.mobile.navigate('#menupage');
                    }
                },
                error: function(request, status, error) {
                    $.mobile.loading('hide');
                    alert('Problema de conexão!');
                }
            });
        }

        function confirmaVenda(botao) {
            if (botao == 2) {
                venda();
            } else {
                $.mobile.loading('hide');
            }
        }

        function confirmaEstorno(botao) {
            if (botao == 2) {
                estornar();
            } else {
                $.mobile.loading('hide');
            }
        }

        function alertaLoginErro() {
            navigator.notification.alert('Código ou Senha incorretos', function() {}, 'Atenção', 'Fechar');
        }

        function mostraErros(erro) {
            navigator.notification.alert(erro, function() {}, 'Atenção', 'Fechar');
        }

        function alertaCartaoIncompleto() {
            navigator.notification.alert('Nº Cartão Incompleto!', function() {}, 'Atenção', 'Fechar');
        }

        function alertaCamposVazios() {
            navigator.notification.alert('Preencha os campos!', function() {}, 'Atenção', 'Fechar');
        }

        function alertaEstSucesso() {
            navigator.notification.alert('Estornada com Sucesso!', function() {}, 'Autorização', 'Fechar');
        }

        function alertaEstErro(erro) {
            navigator.notification.alert(erro, function() {}, 'Atenção', 'Fechar');
        }


        function alertaValorAcima() {
            navigator.notification.alert('Valor não permitido!', function() {}, 'Atenção', 'Fechar');
        }

        function mascara(o, f) {
            v_obj = o
            v_fun = f
            setTimeout("execmascara()", 1)
        }

        function execmascara() {
            v_obj.value = v_fun(v_obj.value)
        }

        function mcar(v) {
            v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
            v = v.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, "$1 $2 $3 $4"); //Coloca parênteses em volta dos dois primeiros dígitos
            return v;
        }


        $(function() {
            var ecs_value = document.getElementById('codecs');
            var sen_value = document.getElementById('senecs');
            var cbox = $.localStorage.get('check_ls');
            ecs_value.value = $.localStorage.get('ecs_ls');
            sen_value.value = $.localStorage.get('sen_ls');
            if (cbox == 1) {
                $("#checkLogin").attr("checked", true).checkboxradio("refresh");
            }
        });