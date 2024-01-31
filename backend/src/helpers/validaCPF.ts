export function validarCPF(cpf: string): string | undefined {
   const formatedCpf: string = cpf.replace(/[.-]/g, "");

   const cpfWhioutVerifyDigit = formatedCpf.slice(0, -2);

   let cpfFormed: string;

   let ac: number = 0;

   //Ir do zero até 8 multiplicando cada digito pelo respectivo valor, que é de 1 até 9
   for (let i = 0; i < cpfWhioutVerifyDigit.length; i++) {
      ac += parseInt(cpfWhioutVerifyDigit[i]) * (i + 1);
   }

   //calcular primeiro digito, caso o resto da divisão for 10, o digito é 0. Caso não é o resto que resultou.
   const firstDigit = ac % 11 === 10 ? 0 : ac % 11;
   //cpf com o primeiro digito
   cpfFormed = cpfWhioutVerifyDigit + firstDigit;
   //zerar acumulador
   ac = 0;

   //Calcular segundo digito ex: 7285286303, multiplicar cada caracter por i que começa do 0 e vai até 9
   for (let i = 0; i < cpfFormed.length; i++) {
      ac += parseInt(cpfFormed[i]) * i;
   }

   const secondDigit = ac % 11 === 10 ? 0 : ac % 11;
   cpfFormed += secondDigit;

   //Caso o cpf enviado for igual ao cpf gerado(que é um cpf valido) retorne esse cpf
   if (formatedCpf === cpfFormed) {
      return cpfFormed;
   }
}
