'use client';

import { useModalStore } from '@/store/modalStore';

export default function AboutModal() {
  const close = useModalStore((s) => s.close);

  return (
    <div data-modal="about" className="modal_wrapper is-about">
      <div className="about_modal">
        <div className="modal_close is-white" onClick={() => close('about')}>
          <img src="/images/close-icon_white.svg" loading="lazy" alt="Close" />
        </div>
        <div className="about_text">
          <div className="text is-sm is-red">
            Shodōka (書道家) - O Mestre Calígrafo<br />
            ‍<br />
            Significa &quot;aquele que segue o caminho da escrita&quot;. Uma pessoa que dedica sua vida a dominar uma forma de expressão que é simultaneamente técnica e estética.<br />
            ‍<br />
            Sho (書) : escrever / caligrafia<br />
            Dō (道) : caminho / via (o mesmo &quot;Dō&quot; de judô, kendô, aikido)<br />
            Ka (家) : pessoa especialista / mestre / artista<br />
            ‍<br />
            Explorando paralelos<br />
            ‍<br />
            Cada traço de um caractere deve ser feito em uma ordem específica e com uma pressão correta. A forma final do caractere precisa ser reconhecível e transmitir seu significado. A estrutura, a &quot;função&quot; de comunicar uma ideia é fundamental. Ele não se contenta em apenas escrever um caractere legível. Ele busca o equilíbrio, o ritmo, a harmonia na composição geral. A estética é parte integrante da mensagem.<br />
            ‍<br />
            Ele não quer apenas um código que funcione, mas um código que seja legível, bem indentado, com nomes de variáveis significativas. Essa forma de desenvolvimento facilita a manutenção e a colaboração, sendo uma qualidade intrínseca do bom trabalho.<br />
            ‍<br />
            Mesmo seguindo as regras milenares dos caracteres, cada calígrafo desenvolve um estilo único. A pressão do pincel, a fluidez do traço. Tudo isso revela a personalidade, o estado de espírito e a maestria do artista naquele momento. Dois mestres calígrafos escrevendo o mesmo poema produzirão obras totalmente distintas.<br />
            ‍<br />
            O desenvolvedor é um mestre calígrafo dos nossos tempos. Ele opera dentro de um sistema de regras rígido para criar algo funcional e belo, deixando sua marca intelectual e estética em cada linha de código que produz
          </div>
        </div>
        <figure className="about_type">
          <img src="/images/vitorono_type.webp" alt="Vitor Ono" loading="lazy" />
        </figure>
        <div className="background_video is-about w-background-video w-background-video-atom">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ backgroundImage: 'url("/videos/Vitor-Ono---About_poster.0000000.jpg")' }}
            data-object-fit="cover"
          >
            <source src="/videos/Vitor-Ono---About_mp4.mp4" />
            <source src="/videos/Vitor-Ono---About_webm.webm" />
          </video>
        </div>
      </div>
    </div>
  );
}
