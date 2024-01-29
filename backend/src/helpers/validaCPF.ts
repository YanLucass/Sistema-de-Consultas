export class ValidaCPF {
   constructor() {}

   validar(cpf: string): boolean {
      const formatedCpf: string = cpf.replace(/[.-]/g, "");

      const cpfWhioutVerifyDigit = formatedCpf.slice(0, -2);

      let cpfFormed: string;

      let ac: number = 0;

      //Ir do zero até 8 multiplicando cada digito pelo respectivo valor, que é de 1 até 9
      for (let i = 0; i < cpfWhioutVerifyDigit.length; i++) {
         ac += parseInt(cpfWhioutVerifyDigit[i]) * (i + 1);
      }

      //calcular primeiro digito
      const firstDigit = ac % 11;
      //cpf com o primeiro digito
      cpfFormed = cpfWhioutVerifyDigit + firstDigit;
      //zerar acumulador
      ac = 0;

      //calcular o segundo digito

      //Calcular segundo digito ex: 7285286303, multiplicar cada caracter por i que começa do 0 e vai até 9
      for (let i = 0; i < cpfFormed.length; i++) {
         ac += parseInt(cpfFormed[i]) * i;
      }

      const secondDigit = ac % 11;
      cpfFormed += secondDigit;

      return formatedCpf === cpfFormed;
   }
}
