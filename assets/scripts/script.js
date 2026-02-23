document.addEventListener('DOMContentLoaded', function () {

    /* =========================================================
       DROPDOWN USUÁRIO (CLIQUE)
    ========================================================= */
    const btnUsuario = document.getElementById('btn-usuario');
    const dropdownUsuario = document.querySelector('.dropdown-usuario');
    const setaUsuario = document.querySelector('.seta-usuario');

    if (btnUsuario && dropdownUsuario) {

        btnUsuario.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownUsuario.classList.toggle('ativo');

            if (setaUsuario) {
                setaUsuario.classList.toggle('ativo');
            }
        });

        document.addEventListener('click', function () {
            dropdownUsuario.classList.remove('ativo');

            if (setaUsuario) {
                setaUsuario.classList.remove('ativo');
            }
        });
    }



    /* =========================================================
       FUNÇÃO REUTILIZÁVEL PARA HOVER PROFISSIONAL
    ========================================================= */
    function ativarHoverProfissional(botaoId, collapseId, setaId, containerInternoSelector) {

        const botao = document.getElementById(botaoId);
        const collapse = document.getElementById(collapseId);
        const seta = document.getElementById(setaId);
        const containerInterno = document.querySelector(containerInternoSelector);

        if (!botao || !collapse || !containerInterno) return;

        let closeTimeout;

        /* ABRIR AO ENTRAR NO BOTÃO */
        botao.addEventListener('mouseenter', function () {
            clearTimeout(closeTimeout);
            $(collapse).collapse('show');
        });

        /* MANTER ABERTO AO ENTRAR NO CONTEÚDO */
        collapse.addEventListener('mouseenter', function () {
            clearTimeout(closeTimeout);
        });

        /* FECHAR AO SAIR DE TUDO */
        function fecharComDelay() {
            closeTimeout = setTimeout(() => {
                $(collapse).collapse('hide');
            }, 300);
        }

        botao.addEventListener('mouseleave', fecharComDelay);
        collapse.addEventListener('mouseleave', fecharComDelay);

        /* SINCRONIZA SETA */
        $(collapse).on('show.bs.collapse', function (e) {
            if (e.target !== collapse) return;
            if (seta) seta.classList.add('ativo');
        });

        $(collapse).on('hide.bs.collapse', function (e) {
            if (e.target !== collapse) return;

            if (seta) seta.classList.remove('ativo');

            // fecha internos
            $(collapse)
                .find('.collapse.show')
                .collapse('hide');
        });

        /* FECHAR AO CLICAR FORA */
        document.addEventListener('click', function (e) {

            const isVisible = collapse.classList.contains('show');
            if (!isVisible) return;

            const clickedOnBotao = botao.contains(e.target);
            const clickedInsideContent = containerInterno.contains(e.target);

            if (!clickedOnBotao && !clickedInsideContent) {
                $(collapse).collapse('hide');
            }
        });
    }



    /* =========================================================
       TRILHAS - HOVER
    ========================================================= */
    ativarHoverProfissional(
        'btn-abrir-tudo',
        'wrapper-grid-trilhas',
        'seta-mestre',
        '.arcodeon-container'
    );



    /* =========================================================
       CARGOS - HOVER (MESMO ESQUEMA)
    ========================================================= */
    ativarHoverProfissional(
        'btn-abrir-cargos',
        'wrapper-grid-cargos',
        'seta-cargos',
        '#wrapper-grid-cargos .container'
    );

});
