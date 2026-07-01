import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade | Imobiliário",
  description:
    "Conheça nossa política de privacidade. Transparência e proteção dos seus dados são nossa prioridade.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="text-primary">Política de Privacidade</h1>

        <div className="mt-12 space-y-8">
          <p className="text-muted-foreground">
            Política de Privacidade do Imobiliário
          </p>

          <p>
            <strong>Data de Vigência:</strong> 01/07/2026
          </p>

          <Separator />

          <section>
            <h2 className="text-primary">Nosso Compromisso com a Sua Privacidade</h2>
            <p className="mt-4 text-muted-foreground">
              No Imobiliário, acreditamos que a privacidade é um direito fundamental.
              Assim como buscamos as melhores oportunidades imobiliárias para você,
              comprometemo-nos a proteger os seus dados pessoais com o mesmo respeito
              e transparência que trazemos para tudo o que fazemos.
            </p>
            <p className="mt-4 text-muted-foreground">
              Sabemos que políticas de privacidade podem parecer impessoais. Escrevemos
              esta de forma clara, honesta e humana — porque é assim que trabalhamos.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Quem Somos</h2>
            <p className="mt-4 text-muted-foreground">
              O Imobiliário é uma plataforma completa para compra, aluguel e investimento
              em imóveis. Nossa missão é conectar pessoas aos melhores imóveis do mercado,
              oferecendo transparência, segurança e as melhores condições financeiras.
            </p>
            <div className="mt-4 text-muted-foreground">
              <p>
                <strong>Imobiliário</strong>
              </p>
              <p>São Paulo, SP, Brasil</p>
              <p>contato@imobiliario.com.br</p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Quais Informações Coletamos</h2>
            <p className="mt-4 text-muted-foreground">
              Coletamos diferentes tipos de informações dependendo de como você interage
              conosco.
            </p>

            <h3 className="mt-6 text-primary">Se Você é um Visitante do Site</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Dados de navegação básica:</strong> Endereço IP, tipo de navegador,
                informações do dispositivo, páginas visitadas e tempo gasto em nosso site.
              </li>
              <li>
                <strong>Cookies e tecnologias similares:</strong> Pequenos arquivos que
                ajudam nosso site a funcionar e melhorar sua experiência.
              </li>
            </ul>

            <h3 className="mt-6 text-primary">Se Você é um Potencial Cliente</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Informações de contato:</strong> Nome, endereço de e-mail, número
                de telefone, nome da empresa e cargo.
              </li>
              <li>
                <strong>Registros de comunicação:</strong> Correspondências, anotações de
                reuniões e consultas sobre imóveis.
              </li>
              <li>
                <strong>Informações financeiras:</strong> Dados necessários para
                simulações de financiamento e processos de compra.
              </li>
            </ul>

            <h3 className="mt-6 text-primary">Se Você é um Proprietário de Imóvel</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Informações do imóvel:</strong> Endereço, características, fotos e
                documentação do imóvel.
              </li>
              <li>
                <strong>Dados de contato:</strong> Nome, telefone, e-mail e informações
                bancárias para repasse de valores.
              </li>
              <li>
                <strong>Documentação:</strong> Escrituras, certidões e outros documentos
                necessários para a transação.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Como Coletamos Informações</h2>
            <p className="mt-4 text-muted-foreground">
              Coletamos informações através de:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Interações diretas:</strong> Quando você preenche formulários,
                entra em contato, agenda visitas ou se comunica com nossa equipe.
              </li>
              <li>
                <strong>Tecnologias automatizadas:</strong> Através de cookies e
                ferramentas de analítica quando você usa nosso site.
              </li>
              <li>
                <strong>Terceiros:</strong> De parceiros de negócios, plataformas de
                captação ou redes profissionais (apenas com permissões apropriadas).
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Como Usamos Suas Informações</h2>
            <p className="mt-4 text-muted-foreground">
              Usamos suas informações para:
            </p>

            <p className="mt-4">
              <strong>Para Todos:</strong>
            </p>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              <li>Operar e melhorar nosso site</li>
              <li>Responder às suas consultas e fornecer suporte ao cliente</li>
              <li>Enviar atualizações importantes sobre nossos serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <p className="mt-4">
              <strong>Para Clientes e Compradores:</strong>
            </p>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              <li>Compreender suas necessidades imobiliárias e fornecer propostas personalizadas</li>
              <li>Gerenciar processos de compra, aluguel e financiamento</li>
              <li>Agendar visitas e tour virtuais</li>
              <li>Enviar oportunidades relevantes (você pode cancelar a qualquer momento)</li>
            </ul>

            <p className="mt-4">
              <strong>Para Proprietários:</strong>
            </p>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              <li>Publicar e promover seus imóveis na plataforma</li>
              <li>Gerenciar solicitações de visita e propostas</li>
              <li>Processar pagamentos e repasses</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Como Protegemos Suas Informações</h2>
            <p className="mt-4 text-muted-foreground">
              Levamos a segurança de dados a sério e implementamos medidas técnicas e
              organizacionais adequadas:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Criptografia:</strong> Dados sensíveis são criptografados em
                trânsito e em repouso.
              </li>
              <li>
                <strong>Controles de acesso:</strong> Apenas membros autorizados da equipe
                podem acessar informações pessoais, e apenas quando necessário.
              </li>
              <li>
                <strong>Armazenamento seguro:</strong> Usamos serviços de nuvem
                confiáveis com sólidos padrões de proteção de dados.
              </li>
              <li>
                <strong>Auditorias regulares:</strong> Revisamos nossas práticas de
                segurança regularmente.
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Dito isso, nenhum sistema é totalmente seguro. Fazemos tudo o que podemos
              para proteger suas informações, mas não podemos garantir segurança absoluta.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Com Quem Compartilhamos Informações</h2>
            <p className="mt-4 text-muted-foreground">
              Não vendemos suas informações pessoais. Nunca.
            </p>
            <p className="mt-4 text-muted-foreground">
              Podemos compartilhar suas informações com:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Parceiros de serviço:</strong> Parceiros confiáveis que nos ajudam
                a operar nosso negócio (ex: hospedagem, serviços de e-mail, processadores
                de pagamento). Eles são contratualmente obrigados a proteger seus dados.
              </li>
              <li>
                <strong>Corretores e imobiliárias parceiras:</strong> Quando você demonstra
                interesse em um imóvel, compartilhamos informações necessárias para
                concretizar a transação.
              </li>
              <li>
                <strong>Obrigações legais:</strong> Podemos divulgar informações se
                exigido por lei, processo legal ou solicitação governamental.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Seus Direitos</h2>
            <p className="mt-4 text-muted-foreground">
              Dependendo de onde você mora, você pode ter os seguintes direitos:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Acesso:</strong> Solicitar uma cópia das informações pessoais que
                mantemos sobre você.
              </li>
              <li>
                <strong>Correção:</strong> Nos solicitar corrigir informações imprecisas
                ou incompletas.
              </li>
              <li>
                <strong>Exclusão:</strong> Solicitar que excluamos suas informações
                pessoais (sujeito a obrigações legais).
              </li>
              <li>
                <strong>Objeção:</strong> Opor-se a certos tipos de processamento.
              </li>
              <li>
                <strong>Restrição:</strong> Nos solicitar para restringir como usamos suas
                informações.
              </li>
              <li>
                <strong>Portabilidade:</strong> Receber seus dados em formato estruturado
                e de uso comum.
              </li>
              <li>
                <strong>Retirar consentimento:</strong> Se estivermos processando seus dados
                com base no consentimento, você pode retirá-lo a qualquer momento.
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Para exercer esses direitos, entre em contato conosco em
              contato@imobiliario.com.br. Responderemos dentro do prazo exigido pela lei
              aplicável.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Cookies e Tecnologias de Rastreamento</h2>
            <p className="mt-4 text-muted-foreground">
              Usamos cookies e tecnologias similares para melhorar sua experiência em
              nosso site.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Cookies essenciais:</strong> Necessários para o funcionamento
                adequado do site.
              </li>
              <li>
                <strong>Cookies de analítica:</strong> Nos ajudam a entender como os
                visitantes usam nosso site.
              </li>
              <li>
                <strong>Cookies de preferência:</strong> Lembram suas configurações e
                preferências.
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Você pode controlar cookies através das configurações do seu navegador. Note
              que desabilitar certos cookies pode afetar a funcionalidade do site.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Por Quanto Tempo Mantemos Suas Informações</h2>
            <p className="mt-4 text-muted-foreground">
              Mantemos suas informações apenas pelo tempo necessário para os fins
              descritos nesta política, ou conforme exigido por lei.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Visitantes do site:</strong> Dados de analítica são geralmente
                retidos por 24 a 26 meses.
              </li>
              <li>
                <strong>Contatos comerciais:</strong> Mantemos informações de contato
                enquanto tivermos um relacionamento ativo, mais um período razoável após.
              </li>
              <li>
                <strong>Clientes:</strong> Informações são mantidas durante toda a
                transação imobiliária e pelo período legal exigido.
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Quando não precisamos mais de suas informações, excluímos ou anonimizamos
              de forma segura.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Privacidade de Crianças</h2>
            <p className="mt-4 text-muted-foreground">
              Nossos serviços e site não são direcionados a menores de 16 anos, e não
              coletamos intencionalmente informações pessoais de crianças através de
              nosso site.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-primary">Alterações Nesta Política</h2>
            <p className="mt-4 text-muted-foreground">
              Podemos atualizar esta política de privacidade de tempos em tempos para
              refletir mudanças em nossas práticas ou requisitos legais. Notificaremos
              sobre mudanças significativas publicando um aviso em nosso site ou entrando
              em contato diretamente.
            </p>
            <p className="mt-4 text-muted-foreground">
              A &quot;Data de Vigência&quot; no topo mostra quando esta política foi
              atualizada pela última vez.
            </p>
          </section>

          <Separator />

          <section>
            <p className="text-muted-foreground">
              Tratamos suas informações da forma como gostaríamos que as nossas fossem
              tratadas — com respeito, transparência e cuidado. Se algo aqui não estiver
              claro, ou se você tiver preocupações, estamos aqui para conversar.
            </p>
            <p className="mt-4 font-medium">
              A confiança começa com transparência.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </article>
    </main>
  );
}

function Separator() {
  return <hr className="border-border" />;
}
