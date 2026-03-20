function meuSite() {
    const form = document.querySelector('.form');
    const resultado = document.querySelector('.resultado');
    const consequencias = document.querySelector('.consequencias');
    const consequenciasMagreza = document.querySelector('.consequenciasMagreza');
    consequencias.style.display = 'none';
    consequenciasMagreza.style.display = 'none';

    const pessoas = JSON.parse(localStorage.getItem('pessoasSalvas')) || [];

    function recebeEventoForm(evento) {
        evento.preventDefault();

        const nome = form.querySelector('.nome');
        const sobrenome = form.querySelector('.sobrenome');
        const peso = form.querySelector('.peso');
        const altura = form.querySelector('.altura');

        if (!nome.value || !sobrenome.value || !peso.value || !altura.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const pesoNum = Number(peso.value);
        const alturaNum = Number(altura.value);

        if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
            alert('Peso e altura devem ser números válidos maiores que zero.');
            return;
        } else if (pesoNum > 500) {
            alert('Por favor, insira um peso realista.');
            return;
        } else if (alturaNum > 3 || alturaNum < 0.5) {
            alert('Por favor, insira uma altura realista em metros (ex: 1.75).');
            return;
        }

        const imc = pesoNum / (alturaNum * alturaNum);
        const imcArredondado = imc.toFixed(2);

        const pesoIdeal = 24.9 * (alturaNum ** 2);
        const pesoIdealArredondado = pesoIdeal.toFixed(2);

        const diferencaPeso = pesoNum - pesoIdeal;

        const diferencaAbsoluta = Math.abs(diferencaPeso).toFixed(2);

        let textoAjustePeso = '';
        if (diferencaPeso < 0) {
            textoAjustePeso = `Você precisaria <strong class="cor-magreza">ganhar</strong> aproximadamente <strong class="cor-magreza">${diferencaAbsoluta} kg</strong> para entrar adequadamente na faixa de peso normal.`;
        } else if (diferencaPeso > 0) {

            const corAjuste = imc >= 30 ? 'cor-obesidade' : 'cor-sobrepeso';
            textoAjustePeso = `Você precisaria <strong class="${corAjuste}">perder</strong> aproximadamente <strong class="${corAjuste}">${diferencaAbsoluta} kg</strong> para entrar adequadamente na faixa de peso normal.`;
        } else {
            textoAjustePeso = `<strong class="cor-normal">Você está exatamente no limite ótimo do seu peso ideal!</strong>`;
        }

        let classificacao = '';
        if (imc < 18.5) classificacao = 'Magreza';
        else if (imc < 25) classificacao = 'Normal';
        else if (imc < 30) classificacao = 'Sobrepeso';
        else classificacao = 'Obesidade';

        let parabens = '';
        let classeCorIMC = '';

        if (classificacao === 'Magreza') classeCorIMC = 'cor-magreza';
        else if (classificacao === 'Normal') classeCorIMC = 'cor-normal';
        else if (classificacao === 'Sobrepeso') classeCorIMC = 'cor-sobrepeso';
        else if (classificacao === 'Obesidade') classeCorIMC = 'cor-obesidade';

        if (classificacao === 'Normal') {
            parabens = `<strong class="${classeCorIMC}">Parabéns! Você está com o peso ideal.</strong>`;
        } else if (classificacao === 'Magreza') {
            parabens = `Você pode melhorar sua saúde ganhando um pouco de peso.<br>Consulte um profissional de saúde para orientação.<br>"<strong class="${classeCorIMC}">A jornada de ganho de peso é uma maratona, não um sprint. Tenha paciência com seu corpo e comemore cada pequena vitória</strong>".`;
        } else if (classificacao === 'Obesidade') {
            parabens = `Você pode melhorar sua saúde ajustando seu peso.<br>Consulte um profissional de saúde para orientação.<br>"<strong class="${classeCorIMC}">O primeiro passo para um emagrecimento saudável é entender seu corpo e buscar tratamento com paciência.</strong>"`;
        } else {
            parabens = `Você pode melhorar sua saúde ajustando seu peso.<br>Consulte um profissional de saúde para orientação.<br>"<strong class="${classeCorIMC}">Pequenos ajustes diários trazem grandes resultados para sua saúde.</strong>"`;
        }

        const novaPessoa = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            peso: pesoNum,
            altura: alturaNum,
            imc: parseFloat(imcArredondado),
            classificacao: classificacao,
        };

        pessoas.push(novaPessoa);

        localStorage.setItem('pessoasSalvas', JSON.stringify(pessoas));
        console.log("Banco de dados local atualizado:", pessoas);

        resultado.innerHTML = `
        <p>
        Nome completo: ${nome.value} ${sobrenome.value}<br>
        Peso: ${pesoNum} kg<br>
        Altura: ${alturaNum} m<br>
        IMC: ${imcArredondado}<br>
        Peso normal limite máximo: ${pesoIdealArredondado} kg<br>
        ${textoAjustePeso}
        </p><br>
        <p>Seu índice de massa corporal está classificado como: <strong class="${classeCorIMC}">${classificacao}</strong></p><br>
        <p>${parabens}</p>`;

        consequencias.style.display = imc >= 30 ? 'flex' : 'none';
        consequenciasMagreza.style.display = imc < 18.5 ? 'flex' : 'none';

    }

    form.addEventListener('submit', recebeEventoForm);
}

meuSite();