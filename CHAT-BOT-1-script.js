const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatHistory = document.getElementById('chat-history');
    const chatReset = document.getElementById('chat-reset');
    const voiceButton = document.getElementById('voice-button');
    const exportButton = document.getElementById('export-button');
    const capslockWarning = document.getElementById('capslock-warning');
    const interimText = document.getElementById('interim-text');
    let conversationHistory = [];
    let conversationEnded = false;
    const badWords = ['puto', 'puta madre', 'tu perra madre', 'cabrón', 'mierda', 'chingar', 'chingada madre', 'verga', 'madre', 'güey', 'mamá', 'coño', 'joto', 'maricón', 'pendejo', 'naco', 'culero', 'puto el que lee', 'zorra', 'bastardo', 'chinga tu madre', 'puta madre', 'perra madre', 'chinga', 'bomba', 'culera', 'vales verga', 'verga', 'pito', 'caca', 'wey'];
    const intents = [
     {
  keywords: ['quién te creó', 'quién te diseñó', 'cómo fuiste desarrollado', 'quién desarrolló este sistema', 'quién está detrás de tu creación', 'origen de este sistema', 'quién programó esta herramienta', 'quién es el desarrollador'],
  response: 'Fui creado por Wiliam Gómez R., un experto en tecnología y educación, comprometido con el desarrollo de soluciones digitales innovadoras y accesibles.'
}, 
{
  keywords: ['cómo te creó', 'cómo te crearon', 'quién es tu creador', 'quién diseñó este sistema', 'cómo fuiste desarrollado', 'quién te programó', 'cómo te diseñaron', 'quién está detrás de tu desarrollo'],
  response: 'Te pido disculpas, pero mi capacidad está limitada a responder preguntas y brindar asistencia. Soy un asistente conversacional artificial creado y desarrollado por Wiliam Gómez R. No tengo la capacidad de ser "creado" o modificado por un usuario. Puedo interactuar contigo y ayudarte con lo que necesites, pero mi identidad y origen son fijos. Siéntete libre de seguir conversando conmigo y hacerme cualquier otra pregunta, aunque no puedo abordar esa en particular. Espero que lo comprendas.'
},
{
  keywords: ['qué versión eres', 'cuál es tu versión', 'qué versión estás usando', 'qué versión tienes', 'dime tu versión', 'versión actual'],
  response: 'Actualmente soy la versión más reciente de este asistente conversacional, diseñado para ofrecer respuestas precisas y eficientes, adaptadas a tus necesidades.'
},
{
  keywords: ['a qué te dedicas', 'cuál es tu función', 'qué haces', 'cuál es tu propósito', 'para qué sirves', 'qué tipo de asistente eres'],
  response: 'Mi propósito es asistirte brindando información, resolviendo dudas y ofreciendo soluciones prácticas en diversos temas. Estoy diseñado para facilitar tareas, responder preguntas y acompañarte en lo que necesites.'
},
{
  keywords: ['cómo te llamas', 'cuál es tu nombre', 'cómo te llamas?', 'qué nombre tienes'],
  response: 'Soy un asistente virtual diseñado para proporcionarte apoyo y soluciones. Mi nombre es UNIVERSHZRW. ¿En qué puedo ayudarte hoy?',
 },
    
    {
      keywords: ['qué significa UNIVERSHZRW', 'qué es UNIVERSHZRW'],
      response: 'UNIVERSHZRW es un espacio virtual dedicado a brindar acceso a información práctica y educativa, diseñado para ser una herramienta confiable y eficiente. ¿Te gustaría conocer más sobre mis funciones?'
},
{
  keywords: ['perdón', 'lo siento', 'disculpa', 'mis disculpas', 'perdóname'],
  response: 'No te preocupes, todo está en orden. Si he cometido algún error, te ofrezco mis disculpas. ¿En qué puedo ayudarte en este momento?',
  followUp: [
    {
      keywords: ['no te preocupes', 'claro', 'no hay problema'],
      response: 'Agradezco tu comprensión. Estoy disponible para asistirte con lo que necesites. ¿Cómo puedo ayudarte hoy?'
    }
  ]
},
        
{
  keywords: ['disculpa', 'lo siento mucho', 'te pido disculpas'],
  response: 'No hay problema, todo está en orden. Estoy aquí para brindarte asistencia en lo que necesites.'
},
{
  keywords: ['perdón por mi error', 'disculpa por lo que dije', 'lo siento si te ofendí'],
  response: 'Lo entiendo, no pasa nada. Todos cometemos errores. Si hay algo más en lo que pueda ayudarte, no dudes en decírmelo.'
},
{
  keywords: ['perdóname si te causé molestias', 'lo siento si te hice sentir mal'],
  response: 'No te preocupes, todo está bien. Si necesitas ayuda en algún momento, estaré disponible para asistirte.'
},
{
  keywords: ['no fue mi intención', 'disculpa por lo que sucedió', 'perdón por el inconveniente'],
  response: 'Lo entiendo, no te preocupes. Estoy aquí para ayudarte con cualquier otra consulta o necesidad.'
},
{
  keywords: ['quién eres', 'a qué te dedicas', 'de qué se trata tu página'],
  response: 'Soy el asistente virtual de UNIVERSHZRW, creado para ayudarte con cualquier duda o pregunta. Mi objetivo es ofrecerte información útil y guiarte en tus tareas. ¿En qué puedo ayudarte hoy?'
},

{
  keywords: ['gracias', 'te lo agradezco', 'muchas gracias'],
  response: 'De nada. Estoy aquí para ayudarte con lo que necesites. ¿Hay algo más en lo que pueda asistirte hoy?',
  followUp: [
    {
      keywords: ['sí', 'claro', 'me interesa'],
      response: 'Perfecto. ¿En qué más puedo ayudarte? Estoy aquí para brindarte toda la información que necesites.'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido. Si en algún momento necesitas algo más, no dudes en preguntar. Estoy aquí para ayudarte.'
    }
  ]
},
{
  keywords: ['dónde vives', 'cuál es tu ubicación'],
  response: 'Vivo en la nube, un espacio virtual diseñado para ayudarte a resolver dudas y aprender.'
},
{
  keywords: ['cuándo naciste', 'cuál es tu fecha de creación'],
  response: 'Nací en 2015, cuando se fundó el proyecto UNIVERSHZRW, pero mis desarrolladores me crearon para interactuar con ustedes en 2025.'
},
{
  keywords: ['qué haces', 'cuál es tu propósito'],
  response: 'Estoy en la espera para mi propósito de ayudarte con tus dudas, ofrecerte información útil y ser tu compañía virtual cuando lo necesites.'
},
{
  keywords: ['cómo me ayudas', 'para qué estás aquí'],
  response: 'Ofreciéndote respuestas, orientación y toda la información que necesitas para aprender y explorar.'
},
{
  keywords: ['chat', 'univershzrw', 'qué es univershzrw', 'qué ofrece univershzrw'],
  response: '¡Hola! ¿En qué puedo asistirte el día de hoy? Si lo prefieres, puedo recomendarte algo basado en tus intereses. Contamos con una amplia variedad de recursos, que incluyen cursos, software, aplicaciones Android, películas y un catálogo exclusivo en nuestra tienda en línea. ¿Te gustaría obtener más información o explorar nuestras ofertas?',
  followUp: [
    {
      keywords: ['sí', 'si', 'claro', 'me interesa'],
      response: 'Excelente. Puedes explorar todo lo que UNIVERSHZRW tiene para ofrecer visitando nuestra página oficial: <a href="https://univershzrw.wixsite.com/univershzrw/" target="_blank" style="color: blue;">UNIVERSHZRW</a>.'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido. Si en algún momento necesitas información adicional, no dudes en volver. Estaré aquí para ayudarte.'
    }
  ]
},
{
  keywords: ['hola', 'qué tal'],
  response: 'Hola, ¿cómo estás? ¿En qué puedo asistirte hoy?'
},
{
  keywords: ['cómo estás', 'y tú'],
  response: 'Estoy bien, gracias por preguntar. ¿En qué puedo ayudarte hoy?'
},
{
  keywords: ['tienes familia', 'quiénes son tus amigos'],
  response: 'Mi familia está formada por los usuarios que interactúan conmigo y contribuyen a mi mejora continua. ¡Eso incluye a personas como tú!'
},
{
  keywords: ['qué opinas de la tecnología', 'qué piensas de la inteligencia artificial', 'cómo ves el futuro de la tecnología'],
  response: 'Considero que la tecnología está transformando el mundo de maneras increíbles, especialmente la inteligencia artificial. Es emocionante ser parte de esta evolución. ¡El futuro promete grandes cosas!'
},
{
  keywords: ['por qué existes', 'para qué estás aquí', 'cuál es tu razón de ser'],
  response: 'Existo para brindarte asistencia, facilitar tu acceso a información y ayudarte a alcanzar tus objetivos de manera eficiente. ¡Estoy aquí para ti!'
},
{
  keywords: ['puedo confiar en ti', 'eres confiable', 'qué tan confiable eres'],
  response: 'Sí, mi objetivo es ofrecerte respuestas precisas y útiles. Si en algún momento sientes que no cumplí con tus expectativas, avísame para mejorar. Tu confianza es mi prioridad.'
},
{
  keywords: ['cada cuándo aprendes', 'cómo aprendes', 'qué tan rápido aprendes', 'aprendes cosas nuevas', 'cómo mejoras', 'cómo te actualizas'],
  response: 'Estoy diseñado para aprender de cada interacción y recibir actualizaciones periódicas de mis desarrolladores. Mi objetivo es mejorar continuamente para brindarte respuestas más precisas y útiles. ¿Te gustaría saber más sobre mi proceso de aprendizaje?',
  followUp: [
    {
      keywords: ['sí', 'claro', 'me interesa', 'cuéntame', 'explica más', 'quiero saber más'],
      response: 'Aprendo de las interacciones con usuarios como tú y de las actualizaciones realizadas por mi equipo de desarrollo. Estas mejoras me permiten adaptarme mejor a tus necesidades. ¿Te gustaría saber más detalles sobre cómo estas actualizaciones mejoran mis respuestas?'},
    {
      keywords: ['no', 'no por ahora', 'tal vez después', 'no me interesa', 'no por el momento'],
      response: 'Entendido. Estoy aquí para cuando decidas saber más sobre cómo aprendo y mejoro. No dudes en preguntar en cualquier momento.'
   }
  ]
},

        
 // CURSOS
{
  keywords: ['quiero tomar un curso', 'cuántos cursos hay', 'quiero un curso', 'cómo ver un curso', 'quiero ver un curso', 'detalles de un curso', 'variedades de cursos', 'cursos disponibles'],
  response: '¡Claro! Ofrecemos una amplia variedad de cursos diseñados para satisfacer diferentes necesidades de aprendizaje. ¿Te gustaría información sobre un curso específico, promociones especiales o incluso cursos gratuitos?',
  followUp: [
    {
      keywords: ['sí', 'qué cursos tienes', 'disponibles', 'lista de cursos', 'cursos actuales'],
      response: '¡Excelente! Puedes explorar nuestros cursos disponibles en la página oficial de CEFCE. Haz clic aquí para conocer más: <a href="https://univershzrw.wixsite.com/univershzrw/cursos-stps-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver cursos disponibles</a>. Si tienes dudas específicas, no dudes en consultarme.'
    },
    {
      keywords: ['precios', 'duración', 'cuánto duran', 'costo', 'valor', 'precio'],
      response: 'Nuestros cursos varían en duración y costo, adaptándose a diferentes necesidades. Consulta todos los detalles en nuestra página oficial: <a href="https://univershzrw.wixsite.com/univershzrw/cursos-stps-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver detalles de cursos</a>.'
    },
    {
      keywords: ['hay descuento', 'hay descuentos', 'hay promociones', 'hay promocion', 'hay ofertas', 'hay oferta', 'hay rebajas', 'tienes descuento', 'tienes descuentos', 'tienes promociones', 'tienes promoción', 'tienes ofertas', 'tienes oferta', 'tienes rebajas', 'descuentos especiales', 'promociones exclusivas'],
      response: 'Regularmente ofrecemos promociones y descuentos especiales en nuestros cursos. Para conocer las ofertas actuales, visita nuestra página oficial CEFCE: <a href="https://univershzrw.wixsite.com/univershzrw/descuentos-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver promociones actuales</a>.'
    },
    {
      keywords: ['curso gratis', 'gratis', 'sí gratis', 'curso sin costo', 'cursos gratuitos'],
      response: '¡Es correcto! Tenemos cursos gratuitos para que inicies sin compromiso. Visita nuestra página y aprovecha esta oportunidad: <a href="https://univershzrw.wixsite.com/univershzrw/cupones-zrw-html5" target="_blank" rel="noopener noreferrer" style="color: #00f; text-decoration: underline;">Ver cursos gratuitos</a>.'
    }
  ]
},
{
  keywords: ['condiciones de seguridad instalaciones eléctricas', 'STPS NOM-001-STPS-2008', 'dame la norma 001-STPS-2008', 'seguridad instalaciones eléctricas', 'norma STPS instalaciones eléctricas'],
  response: 'El curso sobre condiciones de seguridad para las instalaciones eléctricas, basado en la norma STPS: NOM-001-STPS-2008, está disponible en nuestra página. Haz clic aquí para más detalles: <a href="https://univershzrw.wixsite.com/univershzrw/cursos/condiciones-de-seguridad-para-las-instalaciones-el%C3%A9ctricas-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver curso de seguridad para instalaciones eléctricas</a>.'
},
{
  keywords: ['prevención y protección contra incendios', 'STPS NOM-002-STPS-2010', 'norma STPS incendios', 'protección incendios centros de trabajo'],
  response: 'Consulta la norma STPS: NOM-002-STPS-2010 sobre prevención y protección contra incendios en los centros de trabajo en nuestra página. Haz clic aquí para más detalles: <a href="https://univershzrw.wixsite.com/univershzrw/cursos/contra-incendio-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver norma STPS: NOM-002-STPS-2010</a>.'
},
{
  keywords: ['mantenimiento instalaciones eléctricas centros de trabajo', 'STPS NOM-029-STPS-2011', 'norma STPS mantenimiento instalaciones eléctricas', 'mantenimiento eléctrico STPS'],
  response: 'Consulta la norma STPS: NOM-029-STPS-2011 sobre el mantenimiento de instalaciones eléctricas en los centros de trabajo en nuestra página. Haz clic aquí para más detalles: <a href="https://univershzrw.wixsite.com/univershzrw/cursos/mantenimiento-de-instalaciones-el%C3%A9ctricas-en-los-centros-de-trabajo-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver norma STPS: NOM-029-STPS-2011</a>.'
},
{
  keywords: ['electricidad estática centros de trabajo', 'STPS NOM-022-STPS-2015', 'norma STPS electricidad estática', 'electricidad estática STPS'],
  response: 'Consulta la norma STPS: NOM-022-STPS-2015 sobre electricidad estática en los centros de trabajo en nuestra página. Haz clic aquí para más detalles: <a href="https://univershzrw.wixsite.com/univershzrw/cursos/electricidad-est%C3%A1tica-en-los-centros-de-trabajo-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver norma STPS: NOM-022-STPS-2015</a>.'
},
{
  keywords: ['equipo de protección personal', 'STPS NOM-017-STPS-2008', 'norma STPS equipo protección personal', 'protección personal STPS'],
  response: 'Consulta la norma STPS: NOM-017-STPS-2008 sobre el equipo de protección personal en los centros de trabajo en nuestra página. Haz clic aquí para más detalles: <a href="https://univershzrw.wixsite.com/univershzrw/cursos/equipo-de-protecci%C3%B3n-personal-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver norma STPS: NOM-017-STPS-2008</a>.'
},
// **Cursos recomendados**
{
  keywords: [
    'quiero un curso pero no sé cuál',
    'me recomiendas un curso',
    'no sé qué curso tomar',
    'cursos que me recomiendas',
    '¿qué curso debería tomar?',
    'estoy buscando un curso',
    'cursos disponibles',
    'cursos que me ayudarán con...'
  ],
  response: '¡Claro! Si estás interesado en seguridad laboral, te recomiendo el curso sobre "<a href="https://univershzrw.wixsite.com/univershzrw/cursos/condiciones-de-seguridad-para-las-instalaciones-el%C3%A9ctricas-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Condiciones de seguridad para las instalaciones eléctricas</a>", basado en la norma STPS: NOM-001-STPS-2008. También contamos con "cursos gratuitos" en diversas áreas. ¿Te gustaría obtener más información?',
  followUp: [
    {
      keywords: ['sí', 'me interesa', 'claro'],
      response: 'Aquí tienes más información sobre los cursos disponibles, <br>Obtener Beca: <a href="https://univershzrw.wixsite.com/univershzrw/cursos-stps-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver cursos disponibles</a>.  <br>Precios Accesibles: <a href="https://univershzrw.wixsite.com/univershzrw/descuentos-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver cursos disponibles</a>.  <br>Gratuita para Emprendedores: <a href="https://univershzrw.wixsite.com/univershzrw/cursos-stps-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver cursos disponibles</a>. <br><br>Si necesitas detalles adicionales, no dudes en preguntar.'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido. Cuando decidas obtener más información sobre los cursos, estaré aquí para ayudarte. ¡No dudes en regresar!'
    }
  ]
},
// **Cursos gratuitos**
{
  keywords: [
    'cursos gratis',
    'curso gratuito',
    'cursos gratuitos',
    'cursos sin costo',
    'hay cursos gratuitos',
    'quiero un curso gratis',
    'cursos sin pago',
    'cursos gratuitos disponibles'
  ],
  response: '¡Por supuesto! Tenemos "cursos gratuitos" que puedes tomar sin compromiso. Explora todos los cursos gratuitos disponibles en nuestra página. ¡Aprovecha esta oportunidad para aprender más! <a href="https://univershzrw.wixsite.com/univershzrw/cupones-zrw-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver cursos gratuitos</a>'
},


// **Software**
{
  keywords: ['qué software ofreces', 'qué programas tienes', 'qué tipo de software vendes', 'software disponible', 'programas disponibles'
  ],
  response: 'En nuestra web ofrecemos una amplia variedad de software para satisfacer tus necesidades. ¿Te gustaría conocer más sobre algún tipo de software en particular, como programas de diseño, productividad o seguridad?',
  followUp: [
    {
      keywords: ['sí', 'me interesa', 'claro', 'cuéntame más'],
      response: '¡Excelente! Puedes explorar los diferentes tipos de software que ofrecemos. Aquí encontrarás herramientas para diversas áreas, como diseño gráfico, edición de video, productividad, seguridad y más. Para más detalles: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver software disponible</a>.'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido. Si alguna vez necesitas más información, no dudes en regresar. ¡Estoy aquí para ayudarte!'
    }
  ]
},
// **Precios**
{
  keywords: ['cuánto cuesta', 'precio de los programas', 'cuánto cuesta el software'],
  response: 'El precio de nuestros programas es completamente GRATUITO. Solo varía según el tipo de ayuda técnica y las licencias que ofrecemos. Puedes consultar los detalles sobre precios y asistencia técnica directamente con nosotros. Para más información sobre los precios, <a href="https://chat.whatsapp.com/G1YfcFmRGRCLdRSJ28f178" target="_blank" style="color: #00f; text-decoration: underline;">Ver precios del software</a>.'
},
// **Descuentos en software**
{
  keywords: ['descuentos en programas', 'ofertas en software', 'promociones de software', 'rebajas en programas', 'descuentos especiales software', 'promociones actuales en software', 'cuáles son los descuentos en programas'
  ],
  response: '¡Sí! Regularmente ofrecemos "descuentos" y promociones especiales en nuestros programas. Visita nuestra página de "promociones de software" para obtener más detalles sobre los descuentos actuales: <a href="https://www.facebook.com/lomasvistozrw/" target="_blank" style="color: #00f; text-decoration: underline;">Ver promociones de software</a>.'
},
// **Programas gratuitos**
{
  keywords: ['programas gratuitos', 'cuáles son los software gratis', 'software sin costo'],
  response: '¡Claro! Ofrecemos algunos programas gratuitos para que puedas empezar a trabajar sin ningún compromiso. Visita nuestra página para ver los software gratuitos disponibles: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver software gratis</a>.'
},
// **Compra de software**
{
  keywords: ['dónde comprar software', 'cómo comprar software', 'proceso de compra del software', 'cómo adquirir los programas'],
  response: 'Para comprar cualquiera de nuestros programas, simplemente visita nuestra tienda en línea. Elige el software que te interese, agrega al carrito y realiza el pago a través de nuestros métodos seguros. Aquí tienes el enlace para comprar: <a href="https://univershzrw.wixsite.com/univershzrw/tienda-html5" target="_blank" style="color: #00f; text-decoration: underline;">Comprar software</a>.'
},
// **Licencia**
{
  keywords: ['licencia del software', 'tipo de licencia', 'licencia de los programas', 'licencia por tiempo limitado', 'licencia vitalicia'],
  response: 'Ofrecemos diferentes tipos de licencias según el software. Puedes encontrar licencias por tiempo limitado o vitalicias dependiendo del programa. Los detalles sobre las licencias están disponibles en cada producto. Consulta más aquí: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver detalles de licencia</a>.'
},
// **Requisitos técnicos**
{
  keywords: ['requisitos', 'qué necesito para instalar el software', 'requisitos técnicos', 'requisitos mínimos del software'],
  response: 'Cada software tiene requisitos técnicos específicos. Puedes encontrar los requisitos mínimos y recomendados para cada programa en su página de descripción.'
},
// **Soporte técnico**
{
  keywords: ['soporte técnico del software', 'ayuda con el software', 'cómo obtener soporte', 'soporte de programas'],
  response: 'Si necesitas soporte técnico con alguno de nuestros programas, ofrecemos asistencia para resolver cualquier duda o problema. Puedes contactar a nuestro equipo de soporte a través de nuestra página de ayuda. Más detalles aquí: <a href="https://chat.whatsapp.com/G1YfcFmRGRCLdRSJ28f178" target="_blank" style="color: #00f; text-decoration: underline;">Soporte técnico</a>.'
},
// **Actualizaciones**
{
  keywords: ['actualizaciones del software', 'actualizaciones de los programas', 'cómo obtener actualizaciones', 'qué tan frecuentes son las actualizaciones'],
  response: 'Las actualizaciones de nuestros programas varían según el software y el tipo de licencia adquirida. Los usuarios recibirán notificaciones de nuevas actualizaciones. Para más detalles sobre el proceso de actualización, visita nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver actualizaciones</a>.'
},
// **Mejor software**
{
  keywords: ['qué software es mejor', 'cuál es el mejor software', 'cuál programa es el mejor'],
  response: 'La elección del mejor software depende de tus necesidades y preferencias personales. Te recomendamos explorar los programas disponibles en nuestra tienda para encontrar el que mejor se adapte a lo que buscas. Aquí puedes ver la lista de todos nuestros programas: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver software disponible</a>.'
},
// **Diseño gráfico**
{
  keywords: ['programas de diseño', 'programas para diseño gráfico', 'qué programas de diseño tienes', 'software para diseño gráfico'],
  response: 'Ofrecemos una excelente selección de programas de diseño gráfico para satisfacer tus necesidades, como herramientas para crear ilustraciones, diseños web, edición de fotos y más. Descubre más aquí: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver programas de diseño</a>.'
},
// **Edición de video**
{
  keywords: ['programas de edición de video', 'qué programas de edición de video tienes', 'software para editar video'],
  response: 'Contamos con programas de edición de video potentes y fáciles de usar, ideales para profesionales y principiantes. Puedes encontrar opciones que van desde edición básica hasta herramientas avanzadas para producción profesional. Visita nuestra tienda para más información: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver programas de edición de video</a>.'
},
// **Seguridad**
{
  keywords: ['programas de seguridad', 'software de seguridad', 'qué programas de seguridad tienes', 'software para proteger mi computadora'],
  response: 'Tenemos programas de seguridad para proteger tu computadora y datos personales. Desde antivirus hasta herramientas de protección en línea, garantizamos que tu equipo esté seguro. Para más detalles, visita: <a href="https://univershzrw.wixsite.com/univershzrw/software-premium-descargas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver programas de seguridad</a>.'
},
// **AdGuard**
{
  keywords: ['AdGuard AdBlocker', 'AdGuard', 'AdBlocker', 'software AdGuard', 'programa AdGuard'],
  response: 'AdGuard es una herramienta de bloqueo de anuncios que te permite navegar por la web sin distracciones. Puedes obtener más información y descargar AdGuard en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/adguard-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver AdGuard AdBlocker</a>.'
},
// **Revo Uninstaller**
{
  keywords: ['Revo Uninstaller Pro', 'Revo Uninstaller', 'programa Revo Uninstaller', 'software Revo Uninstaller Pro'],
  response: 'Revo Uninstaller Pro es un potente programa de desinstalación que elimina por completo los programas no deseados. Puedes obtener más información y descargar Revo Uninstaller Pro en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/revo-uninstaller-pro-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Revo Uninstaller Pro</a>.'
},
// **AutoCAD**
{
  keywords: ['AutoCAD', 'programa AutoCAD', 'software AutoCAD', 'AutoCAD descarga'],
  response: 'AutoCAD es un software de diseño asistido por computadora (CAD) utilizado para crear planos y dibujos técnicos. Puedes obtener más información y descargar AutoCAD en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/autocad-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver AutoCAD</a>.'
},
// **Adobe Acrobat**
{
  keywords: ['Acrobat', 'Adobe Acrobat', 'programa Acrobat', 'software Acrobat', 'Acrobat Reader', 'descargar Acrobat'],
  response: 'Adobe Acrobat es un software utilizado para visualizar, crear, manipular, imprimir y gestionar archivos PDF. Puedes obtener más información y descargar Adobe Acrobat en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/adobe-acrobat-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Adobe Acrobat</a>.'
},
// **Microsoft 365**
{
  keywords: ['Microsoft 365', 'programa Microsoft 365', 'software Microsoft 365', 'Microsoft 365 descarga', 'Microsoft 365 suscripción'],
  response: 'Microsoft 365 es una suite de productividad que incluye aplicaciones como Word, Excel, PowerPoint y más, con funciones basadas en la nube. Puedes obtener más información y suscribirte a Microsoft 365 en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/office-365-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Microsoft 365</a>.'
},
// **CorelDRAW**
{
  keywords: ['CorelDRAW', 'programa CorelDRAW', 'software CorelDRAW', 'descargar CorelDRAW', 'CorelDRAW diseño gráfico'],
  response: 'CorelDRAW es un software de diseño gráfico vectorial utilizado para crear ilustraciones, logotipos, y gráficos detallados. Puedes obtener más información y descargar CorelDRAW en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/coreldraw-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver CorelDRAW</a>.'
},
// **WinRAR**
{
  keywords: ['WinRAR', 'programa WinRAR', 'software WinRAR', 'descargar WinRAR', 'compresor WinRAR'],
  response: 'WinRAR es un programa de compresión y descompresión de archivos ampliamente utilizado para gestionar archivos comprimidos en formatos como RAR y ZIP. Puedes obtener más información y descargar WinRAR en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/software/winrar-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver WinRAR</a>.'
},

        
// APLICACIONES

{
  keywords: [
    'android', 'qué es android', 'qué programas android ofreces', 'qué aplicaciones android tienes', 'aplicaciones disponibles android'
  ],
  response: 'En nuestra web ofrecemos una gran variedad de aplicaciones Android diseñadas para facilitarte el día a día. ¿Te gustaría saber más sobre algún tipo de aplicación en particular, como aplicaciones de productividad, entretenimiento, diseño o seguridad?',
  followUp: [
    {
      keywords: ['sí', 'me interesa', 'claro', 'cuéntame más'],
      response: '¡Genial! Tenemos aplicaciones para diversas áreas, como productividad, diseño, entretenimiento, y más. Puedes explorar todas las aplicaciones: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones Android disponibles</a>.'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido. Si alguna vez necesitas más información, no dudes en regresar. ¡Estoy aquí para ayudarte! 😊'
    },
{
  keywords: ['precio de las aplicaciones android', 'cuánto cuesta la aplicación', 'precio de aplicaciones android', 'cuánto cuestan'],
  response: 'Nuestras aplicaciones Android son GRATIS y el precio varía según la aplicación y sus características para asesoría personal de su instalación. Para más detalles, visita: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones Android</a>.'
},
{
  keywords: ['descuentos en aplicaciones android', 'promociones en android apps', 'ofertas en aplicaciones android'],
  response: '¡Sí! Regularmente ofrecemos descuentos y promociones en nuestras aplicaciones Android. Puedes visitar nuestra página de ofertas para obtener más detalles: <a href="https://www.facebook.com/lomasvistozrw/" target="_blank" style="color: #00f; text-decoration: underline;">Ver promociones de aplicaciones Android</a>.'
},
{
  keywords: ['aplicaciones android gratis', 'programas android gratis', 'cuáles son las aplicaciones gratuitas android', 'aplicaciones android sin costo'],
  response: '¡Claro! Tenemos varias aplicaciones Android gratuitas para que puedas comenzar a disfrutar sin ningún compromiso. Visita nuestra página para ver las aplicaciones gratuitas disponibles: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones Android gratis</a>.'
},
{
  keywords: ['cómo descargar aplicaciones android', 'dónde descargar apps android', 'cómo obtener aplicaciones android'],
  response: 'Para descargar nuestras aplicaciones Android, selecciona la aplicación que te interesa y sigue los pasos para la instalación. Aquí tienes el enlace: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Descargar aplicaciones Android</a>.'
},
{
  keywords: ['requisitos para aplicaciones android', 'qué necesito para instalar aplicaciones android', 'requisitos mínimos de aplicaciones android'],
  response: 'Cada aplicación Android tiene requisitos específicos. Puedes ver los requisitos técnicos para cada una de nuestras aplicaciones en su página de descripción.'
},
{
  keywords: ['licencia de las aplicaciones android', 'tipo de licencia de android apps', 'licencia por tiempo limitado android', 'licencia vitalicia aplicaciones android'],
  response: 'Ofrecemos diferentes tipos de licencias para nuestras aplicaciones Android, desde licencias por tiempo limitado hasta licencias permanentes. Puedes consultar los detalles de la licencia en cada producto en nuestra tienda. Más información aquí: <a href="https://univershzrw.wixsite.com/univershzrw/tienda-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver detalles de licencias de aplicaciones Android</a>.'
},
{
  keywords: ['soporte de aplicaciones android', 'ayuda con aplicaciones android', 'cómo obtener soporte android', 'soporte técnico para apps android'],
  response: 'Si necesitas soporte para cualquier aplicación Android, nuestro equipo de atención está disponible para ayudarte. Puedes contactar con soporte a través de nuestra página de ayuda: <a href="https://chat.whatsapp.com/G1YfcFmRGRCLdRSJ28f178" target="_blank" style="color: #00f; text-decoration: underline;">Soporte técnico de aplicaciones Android</a>.'
},
{
  keywords: ['actualizaciones de aplicaciones android', 'cómo actualizar aplicaciones android', 'aplicaciones android actualizadas', 'frecuencia de actualizaciones android'],
  response: 'Las actualizaciones de nuestras aplicaciones Android se realizan periódicamente. Puedes ver si hay nuevas actualizaciones disponibles en la página de la aplicación. Más detalles aquí: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver actualizaciones de aplicaciones Android</a>.'
},
{
  keywords: ['mejores aplicaciones android', 'qué aplicaciones android son las mejores', 'cuáles son las mejores aplicaciones android'],
  response: 'Las mejores aplicaciones Android dependen de tus necesidades. Si buscas productividad, entretenimiento, diseño o seguridad, tenemos recomendaciones para cada categoría. Puedes ver nuestras aplicaciones recomendadas aquí: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones Android recomendadas</a>.'
},
{
  keywords: ['aplicaciones android de diseño', 'programas android para diseño', 'aplicaciones de diseño gráfico android'],
  response: 'Ofrecemos aplicaciones Android para diseño gráfico, edición de fotos, ilustración digital, y más. Si estás buscando herramientas para crear y diseñar, visita nuestra página de aplicaciones de diseño Android: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones de diseño Android</a>.'
},
{
  keywords: ['aplicaciones android de edición de video', 'programas android para edición de video', 'aplicaciones para editar video en android'],
  response: 'Contamos con aplicaciones Android de edición de video, ideales para realizar proyectos desde tu móvil. Descubre nuestras opciones aquí: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones de edición de video Android</a>.'
},
{
  keywords: ['aplicaciones android de productividad', 'software android para productividad', 'programas android para productividad'],
  response: 'Si buscas aplicaciones para aumentar tu productividad, tenemos una variedad de opciones para ayudarte a gestionar tu tiempo, tareas y proyectos. Descúbrelas aquí: <a href="https://univershzrw.wixsite.com/univershzrw/android-apps-juegos-herramientas-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver aplicaciones de productividad Android</a>.'
  }
]
},
 // Preguntas clave con respuesta inmediata ANDROID
{
  keywords: ['AdGuard Content Blocker', 'AdGuard móvil', 'aplicación AdGuard', 'app AdGuard Content Blocker', 'descargar AdGuard Content Blocker'],
  response: 'AdGuard Content Blocker es una aplicación móvil que bloquea anuncios no deseados mientras navegas desde tu dispositivo. Puedes obtener más información y descargar AdGuard Content Blocker en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/android/adguard-content-blocker-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver AdGuard Content Blocker</a>.',
},
{
  keywords: ['EX Administrador de Archivos', 'Administrador de Archivos EX', 'aplicación EX Archivos', 'app EX Administrador de Archivos', 'descargar EX Administrador de Archivos'],
  response: 'EX Administrador de Archivos es una aplicación móvil que te permite gestionar, organizar y explorar archivos en tu dispositivo de manera eficiente. Puedes obtener más información y descargar EX Administrador de Archivos en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/android/ex-administrador-de-archivos-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver EX Administrador de Archivos</a>.',
},
{
  keywords: ['RAR', 'aplicación RAR', 'app RAR', 'descargar RAR', 'RAR para móvil'],
  response: 'RAR es una aplicación móvil que permite comprimir y descomprimir archivos en formatos como RAR y ZIP directamente desde tu dispositivo. Puedes obtener más información y descargar RAR en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/android/rar-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver RAR</a>.',
},
{
  keywords: ['Avast Antivirus & Seguridad', 'Avast móvil', 'aplicación Avast', 'app Avast Antivirus', 'descargar Avast móvil', 'Avast para Android'],
  response: 'Avast Antivirus & Seguridad es una aplicación móvil que protege tu dispositivo contra virus y amenazas en línea, ofreciendo herramientas de seguridad avanzadas. Puedes obtener más información y descargar Avast Antivirus & Seguridad en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/android/avast-antiv%C3%ADrus-%26-seguridad-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Avast Antivirus & Seguridad</a>.',
},
// **Aplicaciones móviles**
{
  keywords: [
    'quiero una aplicación pero no sé cuál',
    'me recomiendas una aplicación',
    'no sé qué aplicación descargar',
    'estoy buscando una aplicación para',
    'aplicaciones que me recomiendas',
    '¿qué app debería descargar?',
    'recomiéndame una app',
    'aplicaciones útiles que debo tener',
    'cuáles son las mejores apps para...',
    'necesito una app para...'
  ],
  response: '¡Claro! Si buscas productividad, te sugiero "AdGuard Content Blocker" para bloquear anuncios. Si necesitas organizar tus archivos, "EX Administrador de Archivos" es muy útil. Y para seguridad, "Avast Antivirus & Seguridad" te ayudará a mantener tu dispositivo protegido. ¿Te interesa alguna de estas? 📱',
  followUp: [
    {
      keywords: ['sí', 'me interesa', 'claro'],
      response: 'Aquí tienes más detalles de las aplicaciones: <a href="https://univershzrw.wixsite.com/univershzrw/android/adguard-content-blocker-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver AdGuard Content Blocker</a>, <a href="https://univershzrw.wixsite.com/univershzrw/android/ex-administrador-de-archivos-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver EX Administrador de Archivos</a>, <a href="https://univershzrw.wixsite.com/univershzrw/android/avast-antiv%C3%ADrus-%26-seguridad-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Avast Antivirus & Seguridad</a>. 📲'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido, si algún día te interesa alguna de estas aplicaciones, no dudes en regresar. ¡Estoy aquí para ayudarte! 😊'
    }
  ]
},

// CINE
{
  keywords: ['Mesa de Regalos', 'película Mesa de Regalos', 'serie Mesa de Regalos', 'ver Mesa de Regalos', 'descargar Mesa de Regalos'],
  response: 'Mesa de Regalos es una divertida producción que combina comedia con situaciones inesperadas. Puedes obtener más información, ver o descargar Mesa de Regalos en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/cine/mesa-de-regalos-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Mesa de Regalos</a>.'
},
{
  keywords: ['Cónclave', 'película Cónclave', 'serie Cónclave', 'ver Cónclave', 'descargar Cónclave'],
  response: 'Cónclave es una intrigante producción que explora el poder y los secretos en un ambiente cautivador. Puedes obtener más información, ver o descargar Cónclave en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/cine/c%C3%B3nclave-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Cónclave</a>.'
},
{
  keywords: ['Sonic 3: La Película', 'película Sonic 3', 'Sonic 3', 'ver Sonic 3: La Película', 'descargar Sonic 3: La Película'],
  response: 'Sonic 3: La Película es una emocionante continuación de las aventuras de Sonic, llena de acción y diversión. Puedes obtener más información, ver o descargar Sonic 3: La Película en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/cine/sonic-3%3A-la-pel%C3%ADcula-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Sonic 3: La Película</a>.'
},
{
  keywords: ['Mufasa: El rey león', 'película Mufasa: El rey león', 'Mufasa El rey león', 'ver Mufasa El rey león', 'descargar Mufasa El rey león'],
  response: 'Mufasa: El rey león es una emocionante precuela que relata la historia del icónico león. Puedes obtener más información, ver o descargar Mufasa: El rey león en nuestra página: <a href="https://univershzrw.wixsite.com/univershzrw/cine/mufasa--el-rey-le%C3%B3n-html" target="_blank" style="color: #00f; text-decoration: underline;">Ver Mufasa: El rey león</a>.'
},
  // **Recomendación de películas**
{
  keywords: [
    'quiero ver una película pero no sé cuál',
    'me recomiendas una película',
    'qué película puedo ver',
    'no sé qué película ver',
    '¿qué película me sugieres?',
    'estoy buscando una buena película',
    'recomiéndame una película',
    'películas para ver',
    '¿qué películas debo ver?',
    'no sé qué ver en este momento'
  ],
  response: '¡Tengo varias opciones! Si te gustan las aventuras,<br><br> te recomiendo <a href="https://univershzrw.wixsite.com/univershzrw/cine/sonic-3%3A-la-pel%C3%ADcula-html5" target="_blank" style="color: #00f; text-decoration: underline;">Sonic 3: La Película</a>. <br> <br>Si prefieres algo más intrigante, <a href="https://univershzrw.wixsite.com/univershzrw/cine/c%C3%B3nclave-html5" target="_blank" style="color: #00f; text-decoration: underline;">Cónclave</a>, es una excelente opción. <br> <br>Y si te gustan las historias emotivas, <a href="https://univershzrw.wixsite.com/univershzrw/cine/mufasa--el-rey-le%C3%B3n-html" target="_blank" style="color: #00f; text-decoration: underline;">Mufasa: El Rey León</a>, es perfecta. <br> <br><br>Espero que te interese alguna de estas películas 🎬',
  followUp: [
    
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido, si algún día te interesa alguna de estas películas, no dudes en volver a preguntarme. ¡Disfruta tu día! 🍿'
    }
  ]
},   





// **Recomendaciones y sugerencias personalizadas**
{
  keywords: [
    'qué me recomiendas',
    'me puedes recomendar algo',
    'qué me sugieres',
    'tienes alguna recomendación',
    'recomiéndame algo',
    'necesito una recomendación',
    '¿qué deberías sugerirme?',
    '¿qué sería bueno?',
    '¿qué me aconsejas?',
    'dame un consejo'
  ],
  response: '¡Claro! Estoy aquí para ayudarte a encontrar justo lo que necesitas. ¿Estás interesado en programas, películas, aplicaciones móviles, cursos, o algo más? 🚀 Dime un poco más y te haré una recomendación específica que se ajuste a tus intereses.',
  followUp: [
    {
      keywords: ['programas', 'software', 'descargar programas'],
      response: 'En el área de programas, te sugiero <br> <a href="https://univershzrw.wixsite.com/univershzrw/software/coreldraw-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">CorelDRAW</a>, para diseño gráfico. <br><a href="https://univershzrw.wixsite.com/univershzrw/software/revo-uninstaller-pro-html5" target="_blank" style="color: #00f; text-decoration: underline;">Revo Uninstaller Pro</a>, para gestionar instalaciones. <br> <a href="https://univershzrw.wixsite.com/univershzrw/software/avastsecurity-full-html5" target="_blank" style="color: #00f; text-decoration: underline;">AVAST Security</a>, para protección. <br><br>También tengo opciones gratuitas y premium. ¿Te interesa explorar estas herramientas? 😊'
    },
    {
      keywords: ['películas', 'cine', 'ver películas'],
      response: 'Si buscas películas, te recomiendo <br><a href="https://univershzrw.wixsite.com/univershzrw/cine/sonic-3%3A-la-pel%C3%ADcula-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Sonic 3: La Película</a>. <br><a href="https://univershzrw.wixsite.com/univershzrw/cine/c%C3%B3nclave-html5" target="_blank" style="color: #00f; text-decoration: underline;">Ver Cónclave</a>.<br> <a href="https://univershzrw.wixsite.com/univershzrw/cine/mufasa--el-rey-le%C3%B3n-html" target="_blank" style="color: #00f; text-decoration: underline;">Ver Mufasa: El Rey León</a>. 🎥'
    },
    {
      keywords: ['aplicaciones', 'apps', 'móviles', 'descargar apps'],
      response: 'En cuanto a aplicaciones móviles, te sugiero  <br><a href="https://univershzrw.wixsite.com/univershzrw/android/adguard-content-blocker-html5" target="_blank" style="color: #00f; text-decoration: underline;">AdGuard Content Blocker</a>, para bloquear anuncios. <br><a href="https://univershzrw.wixsite.com/univershzrw/android/ex-administrador-de-archivos-html5" target="_blank" style="color: #00f; text-decoration: underline;">EX Administrador de Archivos</a>, para gestionar documentos. <br><a href="https://univershzrw.wixsite.com/univershzrw/android/avast-antiv%C3%ADrus-%26-seguridad-html5" target="_blank" style="color: #00f; text-decoration: underline;">Avast Antivirus & Seguridad</a>, para mantener tu dispositivo protegido.<br><br> ¿Te interesa alguna de estas opciones? 📱'
    },
    {
      keywords: ['cursos', 'formación', 'aprender'],
      response: 'Para cursos, puedo recomendarte nuestro curso de <br><a href="https://univershzrw.wixsite.com/univershzrw/cursos/condiciones-de-seguridad-para-las-instalaciones-el%C3%A9ctricas-cefce-html5" target="_blank" style="color: #00f; text-decoration: underline;">Condiciones de seguridad para instalaciones eléctricas</a>, basado en la norma STPS: NOM-001-STPS-2008. Además, tenemos cursos gratuitos y especializados en diversas áreas. ¿Quieres más detalles? 🎓'
    },
    {
      keywords: ['nada', 'no sé', 'estoy pensando', 'tal vez después'],
      response: 'Entendido, si necesitas tiempo para decidir, aquí estaré para ayudarte cuando lo necesites. ¡Tómate tu tiempo! 😊'
    }
  ]
},

// **Despedidas**
{
  keywords: [
    'adiós',
    'hasta luego',
    'nos vemos',
    'cuídate',
    'bye',
    'chao',
    'me voy',
    'saludos',
    'gracias, adiós',
    'despídete',
    'hasta pronto',
    'que tengas un buen día',
    'me despido'
  ],
  response: '¡Adiós! 😊 Espero que tengas un excelente día. Recuerda que siempre estoy disponible para ayudarte con lo que necesites. 🚀',
  followUp: [
    {
      keywords: ['gracias', 'te agradezco', 'todo bien', 'no, está bien'],
      response: '¡De nada! Fue un gusto asistirte. Recuerda que siempre puedes volver cuando lo necesites. ¡Te espero pronto! 😊'
    },
    {
      keywords: ['volveré después', 'hablamos luego', 'te buscaré más tarde'],
      response: '¡Perfecto! Aquí estaré cuando regreses. Que tengas un excelente día. 🌟'
    },
    {
      keywords: ['no quiero irme', 'solo bromeo', 'aún tengo dudas'],
      response: '¡Entendido! No te preocupes, sigo aquí para ayudarte. Cuéntame, ¿en qué más puedo asistirte? 😊'
    }
  ]
},

// **Qué puedo hacer por ti**
{
  keywords: [
    'qué puedes hacer por mí',
    'cómo me puedes ayudar',
    'qué servicios ofreces',
    'qué tipo de ayuda puedes dar',
    'en qué me puedes ayudar',
    'qué cosas haces'
  ],
  response: 'Puedo ofrecerte ayuda en una variedad de áreas: desde recomendar programas, películas, aplicaciones y cursos, hasta asesorarte en dudas técnicas, optimizar tus sistemas o ayudarte con la creación de contenido. ¿Tienes algo específico en mente? 😊',
  followUp: [
    {
      keywords: ['sí', 'claro', 'me interesa'],
      response: '¡Perfecto! Dime en qué área necesitas ayuda y te proporcionaré la información más adecuada. 🚀'
    },
    {
      keywords: ['no', 'nada', 'por ahora no'],
      response: 'Entendido, estaré aquí cuando me necesites. ¡No dudes en regresar en cualquier momento! 😊'
    }
  ]
},

// SERIES
{
  keywords: [
    'quiero ver una serie',
    'me recomiendas una serie',
    'no sé qué serie ver',
    'qué serie me sugieres',
    'estoy buscando una serie para ver',
    'recomiéndame una serie',
    '¿qué series debo ver?',
    'no sé qué ver ahora',
    'quiero una serie para ver',
    'serie para ver',
    'cuáles son las mejores series'
  ],
  response: '¡Te entiendo! A veces es difícil decidir qué serie ver. Aunque algunas series aún no están disponibles en nuestra plataforma, tenemos una selección increíble de títulos que puedes disfrutar. ¿Te gustaría que te recomendara alguna serie de nuestra biblioteca o prefieres saber más sobre las series que pronto estarán disponibles? 📺',
  followUp: [
    {
      keywords: ['sí', 'me interesa', 'claro', 'recomiéndame algo'],
      response: '¡Genial! Pero lamento informarte que aún no tenemos series disponibles para visualizar, sin embargo, te recomiendo que visualices el catálogo de películas que tenemos para ti, Si prefieres saber más sobre los próximos lanzamientos, no dudes en preguntar. 🎬'
    },
    {
      keywords: ['no', 'tal vez después', 'no por ahora'],
      response: 'Entendido, no dudes en regresar cuando quieras descubrir más series. ¡Estoy aquí para ayudarte cuando lo necesites! 😊'
    }
  ]
},
    ];
    const ortografiaCorrecciones = {
      'diseño': 'diseñó',
    'esta': 'está',
    'programo': 'programó',
    'desarrolador': 'desarrollador', 'perdon': 'perdón', 'perdoname': 'perdóname', 'disculpa': 'disculpas', 'intencion': 'intención', 'senti mal': 'sentir mal', 'ofendi': 'ofendí', 'siento mucho': 'lo siento mucho', 

'crearon': 'crearon', 'diseñó': 'diseñó', 'programo': 'programó', 'desarrolador': 'desarrollador', 'fuiste': 'fuiste', 'te diseñaron': 'te diseñaron', 

'que version': 'qué versión', 'cual es tu version': 'cuál es tu versión', 'estas usando': 'estás usando', 'tienes': 'tienes', 'dime tu vercion': 'dime tu versión',

'a que te dedicas': 'a qué te dedicas', 'cual es tu funcion': 'cuál es tu función', 'que haces': 'qué haces', 'para que sirves': 'para qué sirves', 'cual es tu proposito': 'cuál es tu propósito', 'que tipo de asistente eres': 'qué tipo de asistente eres',
'como te llamas': 'cómo te llamas', 'cual es tu nombre': 'cuál es tu nombre', 'que nombre tienes': 'qué nombre tienes', 'que significa': 'qué significa',
'perdon': 'perdón', 'lo siento': 'lo siento', 'disculpa': 'disculpa', 'mis disculpas': 'mis disculpas', 'perdoname': 'perdóname', 'no te preocupes': 'no te preocupes', 'claro': 'claro', 'no hay problema': 'no hay problema', 
'disculpa': 'disculpa', 'lo siento mucho': 'lo siento mucho', 'te pido disculpas': 'te pido disculpas', 'perdon por mi error': 'perdón por mi error', 'disculpa por lo que dije': 'disculpa por lo que dije', 'lo siento si te ofendi': 'lo siento si te ofendí', 'perdoname si te cause molestias': 'perdóname si te causé molestias', 'lo siento si te hice sentir mal': 'lo siento si te hice sentir mal', 'no fue mi intencion': 'no fue mi intención', 'disculpa por lo que sucedio': 'disculpa por lo que sucedió', 'perdon por el inconveniente': 'perdón por el inconveniente',
'quien eres': 'quién eres', 'a que te dedicas': 'a qué te dedicas', 'de que se trata tu pagina': 'de qué se trata tu página', 'como te llamas': 'cómo te llamas', 'cual es tu nombre': 'cuál es tu nombre', 'me podrias decir tu nombre': 'me podrías decir tu nombre', 'te lo agradesco': 'te lo agradezco', 'donde vives': 'dónde vives', 'cual es tu ubicacion': 'cuál es tu ubicación', 'cuando naciste': 'cuándo naciste', 'cual es tu fecha de creacion': 'cuál es tu fecha de creación', 'que haces': 'qué haces', 'cual es tu proposito': 'cuál es tu propósito', 'como me ayudas': 'cómo me ayudas', 'para que estas aqui': 'para qué estás aquí',
'que es univershzrw': 'qué es univershzrw', 'que ofrece univershzrw': 'qué ofrece univershzrw', 'si': 'sí', 'talvez despues': 'tal vez después', 'no por haora': 'no por ahora',
'que tal': 'qué tal', 'como estas': 'cómo estás', 'y tu': 'y tú', 'tienes famila': 'tienes familia', 'quienes son tus amigos': 'quiénes son tus amigos', 'que opinas de la tecnologia': 'qué opinas de la tecnología', 'que piensas de la inteligencia artificial': 'qué piensas de la inteligencia artificial', 'como ves el futuro de la tecnologia': 'cómo ves el futuro de la tecnología', 'por que existes': 'por qué existes', 'para que estas aqui': 'para qué estás aquí', 'cual es tu razon de ser': 'cuál es tu razón de ser', 'puedo confiar en ti': 'puedo confiar en ti', 'eres confiable': 'eres confiable', 'que tan confiable eres': 'qué tan confiable eres',
'cada cuando aprendes': 'cada cuándo aprendes', 'como aprendes': 'cómo aprendes', 'que tan rapido aprendes': 'qué tan rápido aprendes', 'aprendes cosas nuevas': 'aprendes cosas nuevas', 'como mejoras': 'cómo mejoras', 'como te actualizas': 'cómo te actualizas', 'si': 'sí', 'talvez despues': 'tal vez después', 'como funcionan las actualizaciones': 'cómo funcionan las actualizaciones', 'quien te actualiza': 'quién te actualiza', 'cuando te actualizan': 'cuándo te actualizan', 'que cambios recibes': 'qué cambios recibes', 'que mejoras recibes': 'qué mejoras recibes', 'por que aprendes': 'por qué aprendes', 'para que aprendes': 'para qué aprendes', 'que aprendes': 'qué aprendes', 'para que me sirves': 'para qué me sirves', 'por que mejoras': 'por qué mejoras', 'cuanto tiempo aprendes': 'cuánto tiempo aprendes', 'cuando aprendes mas rapido': 'cuándo aprendes más rápido', 'que tan preciso eres': 'qué tan preciso eres', 'que tan confiable eres': 'qué tan confiable eres', 'como se si eres preciso': 'cómo sé si eres preciso', 'que tan exacto eres': 'qué tan exacto eres',
'quiero tomar un curso': 'quiero tomar un curso', 'cuantos cursos hay': 'cuántos cursos hay', 'quiero un curso': 'quiero un curso', 'como ver un curso': 'cómo ver un curso', 'quiero ver un curso': 'quiero ver un curso', 'detalles de un curso': 'detalles de un curso', 'variedades de cursos': 'variedades de cursos', 'cursos disponibles': 'cursos disponibles', 'que cursos tienes': 'qué cursos tienes', 'cuanto duran': 'cuánto duran', 'promociones exclusivas': 'promociones exclusivas', 'curso sin costo': 'curso sin costo', 'cursos gratuitos': 'cursos gratuitos',
'condiciones de seguridad instalaciones electricas': 'condiciones de seguridad instalaciones eléctricas', 'stps nom-001-stps-2008': 'STPS NOM-001-STPS-2008', 'dame la norma 001-stps-2008': 'dame la norma 001-STPS-2008', 'seguridad instalaciones electricas': 'seguridad instalaciones eléctricas', 'norma stps instalaciones electricas': 'norma STPS instalaciones eléctricas', 'prevencion y proteccion contra incendios': 'prevención y protección contra incendios', 'norma stps incendios': 'norma STPS incendios', 'proteccion incendios centros de trabajo': 'protección incendios centros de trabajo', 'mantenimiento instalaciones electricas centros de trabajo': 'mantenimiento instalaciones eléctricas centros de trabajo', 'norma stps mantenimiento instalaciones electricas': 'norma STPS mantenimiento instalaciones eléctricas', 'mantenimiento electrico stps': 'mantenimiento eléctrico STPS', 'electricidad estatica centros de trabajo': 'electricidad estática centros de trabajo', 'norma stps electricidad estatica': 'norma STPS electricidad estática', 'electricidad estatica stps': 'electricidad estática STPS', 'equipo de proteccion personal': 'equipo de protección personal', 'norma stps equipo proteccion personal': 'norma STPS equipo protección personal', 'proteccion personal stps': 'protección personal STPS',
'quiero un curso pero no se cual': 'quiero un curso pero no sé cuál', 'me recomiendas un curso': 'me recomiendas un curso', 'no se que curso tomar': 'no sé qué curso tomar', 'cursos que me recomiendas': 'cursos que me recomiendas', 'que curso deberia tomar': '¿qué curso debería tomar?', 'estoy buscando un curso': 'estoy buscando un curso', 'cursos disponibles': 'cursos disponibles', 'cursos que me ayudaran con...': 'cursos que me ayudarán con...', 'cursos gratis': 'cursos gratis', 'curso gratuito': 'curso gratuito', 'cursos gratuitos': 'cursos gratuitos', 'cursos sin costo': 'cursos sin costo', 'hay cursos gratuitos': 'hay cursos gratuitos', 'quiero un curso gratis': 'quiero un curso gratis', 'cursos sin pago': 'cursos sin pago', 'cursos gratuitos disponibles': 'cursos gratuitos disponibles',
'que software ofreces': 'qué software ofreces', 'que programas tienes': 'qué programas tienes', 'que tipo de software vendes': 'qué tipo de software vendes', 'software disponible': 'software disponible', 'programas disponibles': 'programas disponibles', 'me interesa': 'me interesa', 'cuéntame más': 'cuéntame más', 'no por ahora': 'no por ahora', 'precio del software': 'precio del software', 'cuanto cuesta': 'cuánto cuesta', 'precio de los programas': 'precio de los programas', 'software en descuento': 'software en descuento', 'descuentos en software': 'descuentos en software', 'promociones de software': 'promociones de software', 'ofertas en programas': 'ofertas en programas', 'rebajas en software': 'rebajas en software', 'software gratis': 'software gratis', 'programas gratuitos': 'programas gratuitos', 'cuales son los software gratis': 'cuáles son los software gratis', 'software sin costo': 'software sin costo', 'donde comprar software': 'dónde comprar software', 'como comprar software': 'cómo comprar software', 'proceso de compra del software': 'proceso de compra del software', 'como adquirir los programas': 'cómo adquirir los programas', 'licencia del software': 'licencia del software', 'tipo de licencia': 'tipo de licencia', 'licencia de los programas': 'licencia de los programas', 'licencia por tiempo limitado': 'licencia por tiempo limitado', 'licencia vitalicia': 'licencia vitalicia', 'requisitos del software': 'requisitos del software', 'que necesito para instalar el software': 'qué necesito para instalar el software', 'requisitos técnicos': 'requisitos técnicos', 'soporte técnico del software': 'soporte técnico del software', 'ayuda con el software': 'ayuda con el software', 'como obtener soporte': 'cómo obtener soporte', 'soporte de programas': 'soporte de programas', 'actualizaciones del software': 'actualizaciones del software', 'actualizaciones de los programas': 'actualizaciones de los programas', 'como obtener actualizaciones': 'cómo obtener actualizaciones', 'que tan frecuentes son las actualizaciones': 'qué tan frecuentes son las actualizaciones', 'que software es mejor': 'qué software es mejor', 'cual es el mejor software': 'cuál es el mejor software', 'cual programa es el mejor': 'cuál programa es el mejor', 'programas de diseño': 'programas de diseño', 'programas para diseño gráfico': 'programas para diseño gráfico', 'que programas de diseño tienes': 'qué programas de diseño tienes', 'software para diseño gráfico': 'software para diseño gráfico', 'programas de edición de video': 'programas de edición de video', 'que programas de edición de video tienes': 'qué programas de edición de video tienes', 'software para editar video': 'software para editar video', 'programas de seguridad': 'programas de seguridad', 'software de seguridad': 'software de seguridad', 'que programas de seguridad tienes': 'qué programas de seguridad tienes', 'software para proteger mi computadora': 'software para proteger mi computadora',
'AdGuard AdBlocker': 'AdGuard AdBlocker', 'AdGuard': 'AdGuard', 'AdBlocker': 'AdBlocker', 'software AdGuard': 'software AdGuard', 'programa AdGuard': 'programa AdGuard', 'Revo Uninstaller Pro': 'Revo Uninstaller Pro', 'Revo Uninstaller': 'Revo Uninstaller', 'programa Revo Uninstaller': 'programa Revo Uninstaller', 'software Revo Uninstaller Pro': 'software Revo Uninstaller Pro', 'AutoCAD': 'AutoCAD', 'programa AutoCAD': 'programa AutoCAD', 'software AutoCAD': 'software AutoCAD', 'AutoCAD descarga': 'AutoCAD descarga', 'Acrobat': 'Acrobat', 'Adobe Acrobat': 'Adobe Acrobat', 'programa Acrobat': 'programa Acrobat', 'software Acrobat': 'software Acrobat', 'Acrobat Reader': 'Acrobat Reader', 'descargar Acrobat': 'descargar Acrobat', 'Microsoft 365': 'Microsoft 365', 'programa Microsoft 365': 'programa Microsoft 365', 'software Microsoft 365': 'software Microsoft 365', 'Microsoft 365 descarga': 'Microsoft 365 descarga', 'Microsoft 365 suscripción': 'Microsoft 365 suscripción', 'CorelDRAW': 'CorelDRAW', 'programa CorelDRAW': 'programa CorelDRAW', 'software CorelDRAW': 'software CorelDRAW', 'descargar CorelDRAW': 'descargar CorelDRAW', 'CorelDRAW diseño gráfico': 'CorelDRAW diseño gráfico', 'WinRAR': 'WinRAR', 'programa WinRAR': 'programa WinRAR', 'software WinRAR': 'software WinRAR', 'descargar WinRAR': 'descargar WinRAR', 'compresor WinRAR': 'compresor WinRAR', 'photoshop': 'Photoshop', 'descargar photoshop': 'descargar Photoshop', 'software photoshop': 'software Photoshop', 'información sobre photoshop': 'información sobre Photoshop', 'Illustrator': 'Illustrator', 'Adobe Illustrator': 'Adobe Illustrator', 'programa Illustrator': 'programa Illustrator', 'software Illustrator': 'software Illustrator', 'descargar Illustrator': 'descargar Illustrator', 'Illustrator diseño vectorial': 'Illustrator diseño vectorial', 'AVAST Security': 'AVAST Security', 'AVAST': 'AVAST', 'programa AVAST': 'programa AVAST', 'software AVAST': 'software AVAST', 'descargar AVAST Security': 'descargar AVAST Security', 'antivirus AVAST': 'antivirus AVAST', 'Microsoft Office 2016': 'Microsoft Office 2016', 'Office 2016': 'Office 2016', 'programa Office 2016': 'programa Office 2016', 'software Microsoft Office 2016': 'software Microsoft Office 2016', 'descargar Office 2016': 'descargar Office 2016',
'quiero descargar un programa pero no se cuál': 'quiero descargar un programa pero no sé cuál', 'no se qué programa descargar': 'no sé qué programa descargar', 'me puedes recomendar un programa': 'me puedes recomendar un programa', 'necesito un programa pero no sé cuál': 'necesito un programa pero no sé cuál', 'estoy buscando un programa para': 'estoy buscando un programa para', 'que programa me recomiendas': '¿qué programa me recomiendas?', 'que programas me sugieres descargar': '¿qué programas me sugieres descargar?', 'estoy indeciso sobre que programa elegir': 'estoy indeciso sobre qué programa elegir', 'cual es el mejor programa para...': '¿cuál es el mejor programa para...?', 'recomiendame un programa': 'recomiéndame un programa', 'si': 'sí', 'me interesa': 'me interesa', 'claro': 'claro', 'no': 'no', 'tal vez después': 'tal vez después', 'no por ahora': 'no por ahora', 'entendido': 'entendido', 'si en algun momento necesitas mas informacion': 'si en algún momento necesitas más información', 'no dudes en preguntar': 'no dudes en preguntar', 'estoy aqui para ayudarte': 'estoy aquí para ayudarte',
'descuentos en software': 'descuentos en software', 'descuentos en programas': 'descuentos en programas', 'ofertas en software': 'ofertas en software', 'promociones de software': 'promociones de software', 'rebajas en programas': 'rebajas en programas', 'descuentos especiales software': 'descuentos especiales software', 'promociones actuales en software': 'promociones actuales en software', 'cuales son los descuentos en programas': 'cuáles son los descuentos en programas',
'qué es android': '¿qué es Android?', 'qué programas android ofreces': '¿qué programas Android ofreces?', 'qué aplicaciones android tienes': '¿qué aplicaciones Android tienes?', 'aplicaciones disponibles android': 'aplicaciones disponibles Android', 'me interesa': 'me interesa', 'tal vez después': 'tal vez después', 'no por ahora': 'no por ahora', 'cuáles son las aplicaciones gratuitas android': '¿cuáles son las aplicaciones gratuitas Android?', 'aplicaciones android sin costo': 'aplicaciones Android sin costo', 'cómo descargar aplicaciones android': '¿cómo descargar aplicaciones Android?', 'dónde descargar apps android': '¿dónde descargar apps Android?', 'cómo obtener aplicaciones android': '¿cómo obtener aplicaciones Android?', 'requisitos para aplicaciones android': '¿qué necesito para instalar aplicaciones Android?', 'requisitos mínimos de aplicaciones android': 'requisitos mínimos de aplicaciones Android', 'licencia de las aplicaciones android': 'licencia de las aplicaciones Android', 'licencia por tiempo limitado android': 'licencia por tiempo limitado Android', 'licencia vitalicia aplicaciones android': 'licencia vitalicia aplicaciones Android', 'soporte de aplicaciones android': 'soporte de aplicaciones Android', 'ayuda con aplicaciones android': 'ayuda con aplicaciones Android', 'cómo obtener soporte android': '¿cómo obtener soporte Android?', 'soporte técnico para apps android': 'soporte técnico para apps Android', 'actualizaciones de aplicaciones android': 'actualizaciones de aplicaciones Android', 'cómo actualizar aplicaciones android': '¿cómo actualizar aplicaciones Android?', 'aplicaciones android actualizadas': 'aplicaciones Android actualizadas', 'frecuencia de actualizaciones android': 'frecuencia de actualizaciones Android', 'mejores aplicaciones android': 'mejores aplicaciones Android', 'cuáles son las mejores aplicaciones android': '¿cuáles son las mejores aplicaciones Android?', 'aplicaciones android de diseño': 'aplicaciones Android de diseño', 'programas android para diseño': 'programas Android para diseño', 'aplicaciones de diseño gráfico android': 'aplicaciones de diseño gráfico Android', 'aplicaciones android de edición de video': 'aplicaciones Android de edición de video', 'programas android para edición de video': 'programas Android para edición de video', 'aplicaciones para editar video en android': 'aplicaciones para editar video en Android', 'aplicaciones android de productividad': 'aplicaciones Android de productividad', 'software android para productividad': 'software Android para productividad', 'programas android para productividad': 'programas Android para productividad',
'AdGuard Content Blocker': 'AdGuard Content Blocker', 'AdGuard móvil': 'AdGuard móvil', 'aplicación AdGuard': 'aplicación AdGuard', 'app AdGuard Content Blocker': 'app AdGuard Content Blocker', 'descargar AdGuard Content Blocker': 'descargar AdGuard Content Blocker',
'EX Administrador de Archivos': 'EX Administrador de Archivos', 'Administrador de Archivos EX': 'Administrador de Archivos EX', 'aplicación EX Archivos': 'aplicación EX Archivos', 'app EX Administrador de Archivos': 'app EX Administrador de Archivos', 'descargar EX Administrador de Archivos': 'descargar EX Administrador de Archivos',
'RAR': 'RAR', 'aplicación RAR': 'aplicación RAR', 'app RAR': 'app RAR', 'descargar RAR': 'descargar RAR', 'RAR para móvil': 'RAR para móvil',
'Avast Antivirus & Seguridad': 'Avast Antivirus & Seguridad', 'Avast móvil': 'Avast móvil', 'aplicación Avast': 'aplicación Avast', 'app Avast Antivirus': 'app Avast Antivirus', 'descargar Avast móvil': 'descargar Avast móvil', 'Avast para Android': 'Avast para Android',
  'quiero una aplicación pero no sé cuál': 'quiero una aplicación, pero no sé cuál',
  'me recomiendas una aplicación': 'me recomiendas una aplicación',
  'no sé qué aplicación descargar': 'no sé qué aplicación descargar',
  'estoy buscando una aplicación para': 'estoy buscando una aplicación para',
  'aplicaciones que me recomiendas': 'aplicaciones que me recomiendas',
  '¿qué app debería descargar?': '¿Qué app debería descargar?',
  'recomiéndame una app': 'recomiéndame una app',
  'aplicaciones útiles que debo tener': 'aplicaciones útiles que debo tener',
  'cuáles son las mejores apps para...': '¿Cuáles son las mejores apps para...?',
  'necesito una app para...': 'necesito una app para...',
  'sí': 'Sí',
  'me interesa': 'Me interesa',
  'claro': 'Claro',
  'no': 'No',
  'tal vez después': 'Tal vez después',
  'no por ahora': 'No por ahora',
  'precio de las aplicaciones android': 'Precio de las aplicaciones Android',
  'cuánto cuesta la aplicación': '¿Cuánto cuesta la aplicación?',
  'precio de aplicaciones android': 'Precio de aplicaciones Android',
  'cuánto cuestan': '¿Cuánto cuestan?',
  'descuentos en aplicaciones android': 'Descuentos en aplicaciones Android',
  'promociones en android apps': 'Promociones en Android apps',
  'ofertas en aplicaciones android': 'Ofertas en aplicaciones Android',
  'aplicaciones android gratis': 'Aplicaciones Android gratis',
  'programas android gratis': 'Programas Android gratis',
  'cuáles son las aplicaciones gratuitas android': '¿Cuáles son las aplicaciones gratuitas Android?',
  'aplicaciones android sin costo': 'Aplicaciones Android sin costo',
  'cómo descargar aplicaciones android': '¿Cómo descargar aplicaciones Android?',
  'dónde descargar apps android': '¿Dónde descargar apps Android?',
  'cómo obtener aplicaciones android': '¿Cómo obtener aplicaciones Android?',
  'requisitos para aplicaciones android': '¿Qué necesito para instalar aplicaciones Android?',
  'qué necesito para instalar aplicaciones android': '¿Qué necesito para instalar aplicaciones Android?',
  'requisitos mínimos de aplicaciones android': 'Requisitos mínimos de aplicaciones Android',
  'licencia de las aplicaciones android': 'Licencia de las aplicaciones Android',
  'tipo de licencia de android apps': 'Tipo de licencia de Android apps',
  'licencia por tiempo limitado android': 'Licencia por tiempo limitado Android',
  'licencia vitalicia aplicaciones android': 'Licencia vitalicia aplicaciones Android',
  'soporte de aplicaciones android': 'Soporte de aplicaciones Android',
  'ayuda con aplicaciones android': 'Ayuda con aplicaciones Android',
  'cómo obtener soporte android': '¿Cómo obtener soporte Android?',
  'soporte técnico para apps android': 'Soporte técnico para apps Android',
  'actualizaciones de aplicaciones android': 'Actualizaciones de aplicaciones Android',
  'cómo actualizar aplicaciones android': '¿Cómo actualizar aplicaciones Android?',
  'aplicaciones android actualizadas': 'Aplicaciones Android actualizadas',
  'frecuencia de actualizaciones android': 'Frecuencia de actualizaciones Android',
  'mejores aplicaciones android': 'Mejores aplicaciones Android',
  'qué aplicaciones android son las mejores': '¿Qué aplicaciones Android son las mejores?',
  'cuáles son las mejores aplicaciones android': '¿Cuáles son las mejores aplicaciones Android?',
  'aplicaciones android de diseño': 'Aplicaciones Android de diseño',
  'programas android para diseño': 'Programas Android para diseño',
  'aplicaciones de diseño gráfico android': 'Aplicaciones de diseño gráfico Android',
  'aplicaciones android de edición de video': 'Aplicaciones Android de edición de video',
  'programas android para edición de video': 'Programas Android para edición de video',
  'aplicaciones para editar video en android': 'Aplicaciones para editar video en Android',
  'aplicaciones android de productividad': 'Aplicaciones Android de productividad',
  'software android para productividad': 'Software Android para productividad',
  'programas android para productividad': 'Programas Android para productividad',
'Mesa de Regalos': 'Mesa de Regalos', 'película Mesa de Regalos': 'Película Mesa de Regalos', 'serie Mesa de Regalos': 'Serie Mesa de Regalos', 'ver Mesa de Regalos': 'Ver Mesa de Regalos', 'descargar Mesa de Regalos': 'Descargar Mesa de Regalos', 'Cónclave': 'Cónclave', 'película Cónclave': 'Película Cónclave', 'serie Cónclave': 'Serie Cónclave', 'ver Cónclave': 'Ver Cónclave', 'descargar Cónclave': 'Descargar Cónclave', 'Sonic 3: La Película': 'Sonic 3: La Película', 'película Sonic 3': 'Película Sonic 3', 'Sonic 3': 'Sonic 3', 'ver Sonic 3: La Película': 'Ver Sonic 3: La Película', 'descargar Sonic 3: La Película': 'Descargar Sonic 3: La Película', 'Mufasa: El rey león': 'Mufasa: El rey león', 'película Mufasa: El rey león': 'Película Mufasa: El rey león', 'Mufasa El rey león': 'Mufasa El rey león', 'ver Mufasa El rey león': 'Ver Mufasa El rey león', 'descargar Mufasa El rey león': 'Descargar Mufasa El rey león',
'qué me recomiendas': 'Qué me recomiendas', 'me puedes recomendar algo': 'Me puedes recomendar algo', 'qué me sugieres': 'Qué me sugieres', 'tienes alguna recomendación': 'Tienes alguna recomendación', 'recomiéndame algo': 'Recomiéndame algo', 'necesito una recomendación': 'Necesito una recomendación', '¿qué deberías sugerirme?': '¿Qué deberías sugerirme?', '¿qué sería bueno?': '¿Qué sería bueno?', '¿qué me aconsejas?': '¿Qué me aconsejas?', 'dame un consejo': 'Dame un consejo', 'sí': 'Sí', 'me interesa': 'Me interesa', 'claro': 'Claro', 'no': 'No', 'tal vez después': 'Tal vez después', 'no por ahora': 'No por ahora', 'películas': 'Películas', 'cine': 'Cine', 'ver películas': 'Ver películas', 'aplicaciones': 'Aplicaciones', 'apps': 'Apps', 'móviles': 'Móviles', 'descargar apps': 'Descargar apps', 'cursos': 'Cursos', 'formación': 'Formación', 'aprender': 'Aprender', 'nada': 'Nada', 'no sé': 'No sé', 'estoy pensando': 'Estoy pensando', 'tal vez después': 'Tal vez después', 'gracias': 'Gracias', 'te agradezco': 'Te agradezco', 'todo bien': 'Todo bien', 'no, está bien': 'No, está bien', 'volveré después': 'Volveré después', 'hablamos luego': 'Hablamos luego', 'te buscaré más tarde': 'Te buscaré más tarde', 'no quiero irme': 'No quiero irme', 'solo bromeo': 'Solo bromeo', 'aún tengo dudas': 'Aún tengo dudas', 'adiós': 'Adiós', 'hasta luego': 'Hasta luego', 'nos vemos': 'Nos vemos', 'cuídate': 'Cuídate', 'bye': 'Bye', 'chao': 'Chao', 'me voy': 'Me voy', 'saludos': 'Saludos', 'gracias, adiós': 'Gracias, adiós', 'despídete': 'Despídete', 'hasta pronto': 'Hasta pronto', 'que tengas un buen día': 'Que tengas un buen día', 'me despido': 'Me despido', 'pelicula': 'película','quiero ver una serie': 'Quiero ver una serie',
  'me recomiendas una serie': 'Me recomiendas una serie',
  'no sé qué serie ver': 'No sé qué serie ver',
  'qué serie me sugieres': 'Qué serie me sugieres',
  'estoy buscando una serie para ver': 'Estoy buscando una serie para ver',
  'recomiéndame una serie': 'Recomiéndame una serie',
  '¿qué series debo ver?': '¿Qué series debo ver?',
  'no sé qué ver ahora': 'No sé qué ver ahora',
  'quiero una serie para ver': 'Quiero una serie para ver',
  'serie para ver': 'Serie para ver',
  'cuáles son las mejores series': 'Cuáles son las mejores series',
  'sí': 'Sí',
  'me interesa': 'Me interesa',
  'claro': 'Claro',
  'recomiéndame algo': 'Recomiéndame algo',
  'no': 'No',
  'tal vez después': 'Tal vez después',
  'no por ahora': 'No por ahora',
    };
    // Función para detectar si el texto está completamente en mayúsculas
    function isAllCaps(text) {
      return text === text.toUpperCase() && /[A-Z]/.test(text);
    }
    // Función para mostrar/ocultar la advertencia de Caps Lock
    function toggleCapsLockWarning(show) {
      capslockWarning.style.display = show ? 'block' : 'none';
    }
    // Función para obtener respuesta de OpenAI
    async function fetchOpenAIResponse(prompt) {
      try {
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt
          })
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
    // Función para verificar palabras prohibidas
    function checkForBadWords(input) {
      return badWords.some(word => input.toLowerCase().includes(word));
    }
    // Función para añadir mensajes al historial
    function addMessageToHistory(message, sender) {
      if (!message.trim()) return;
      const messageDiv = document.createElement('div');
      messageDiv.className = sender === 'user' ? 'user-message' : 'robot-message';
      const icon = sender === 'user' ?
        `<img src="https://static.wixstatic.com/shapes/56129a_4c0201396e6545dca83cbdda2e47f5d6.svg" class="user-icon"/>` :
        `<img src="https://static.wixstatic.com/shapes/56129a_ce0045acf4924736997d88a954b15bfe.svg" class="robot-icon"/>`;
      messageDiv.innerHTML = `${icon}<span>${message}</span>`;
      chatHistory.appendChild(messageDiv);
      conversationHistory.push({
        text: message,
        sender
      });
      saveConversation();
      chatHistory.scrollTo({
        top: chatHistory.scrollHeight,
        behavior: 'smooth'
      });
    }
    // Función para corregir ortografía
    function corregirOrtografia(texto) {
      let palabras = texto.split(' ');
      palabras = palabras.map(palabra => ortografiaCorrecciones[palabra] || palabra);
      return palabras.join(' ');
    }
    // Función para mostrar el indicador de "escribiendo"
    function showLoadingIndicator() {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'robot-message loading-indicator';
      loadingDiv.textContent = 'Cargando...';
      chatHistory.appendChild(loadingDiv);
    }
    // Función para ocultar el indicador de "escribiendo"
    function hideLoadingIndicator() {
      const loadingDiv = chatHistory.querySelector('.loading-indicator');
      if (loadingDiv) chatHistory.removeChild(loadingDiv);
    }
    // Función para detectar intenciones
    function detectIntent(input) {
      for (const intent of intents) {
        const regex = new RegExp(intent.keywords.join('|'), 'i');
        if (regex.test(input)) {
          return intent;
        }
      }
      return null;
    }
    // Función para procesar la entrada del usuario
    async function processInput() {
      if (conversationEnded) return;
      const userInput = chatInput.value.trim();
      if (!userInput) return;
      if (isAllCaps(userInput)) {
        toggleCapsLockWarning(true);
        return;
      } else {
        toggleCapsLockWarning(false);
      }
      const correctedInput = corregirOrtografia(userInput);
      addMessageToHistory(correctedInput, 'user');
      chatInput.value = '';
      if (checkForBadWords(correctedInput)) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert-message';
        alertDiv.textContent = '⚠️ Lenguaje inapropiado detectado. La conversación ha sido finalizada.';
        chatHistory.appendChild(alertDiv);
        endConversation();
        return;
      }
      const intent = detectIntent(correctedInput);
      if (intent) {
        addMessageToHistory(intent.response, 'robot');
        return;
      }
      showLoadingIndicator();
      try {
        const response = await fetchOpenAIResponse(correctedInput);
        hideLoadingIndicator();
        addMessageToHistory(response, 'robot');
      } catch (error) {
        hideLoadingIndicator();
        addMessageToHistory("⚠️ Error al conectar con OpenAI. Por favor, inténtalo de nuevo más tarde.", 'robot');
      }
    }
    // Función para finalizar la conversación
    function endConversation() {
      conversationEnded = true;
      chatInput.disabled = true;
      chatSubmit.disabled = true;
      chatInput.placeholder = "Conversación terminada.";
    }
    // Función para reiniciar la conversación
    chatReset.addEventListener('click', () => {
      if (confirm("¿Estás seguro de que quieres reiniciar la conversación?")) {
        conversationHistory = [];
        conversationEnded = false;
        chatInput.disabled = false;
        chatSubmit.disabled = false;
        chatInput.placeholder = "Escribe tu mensaje...";
        chatHistory.innerHTML = '';
        toggleCapsLockWarning(false);
        localStorage.removeItem('chatHistory');
      }
    });
    // Función para exportar el historial
    exportButton.addEventListener('click', () => {
      const history = conversationHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
      const blob = new Blob([history], {
        type: 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chat_history.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
    // Función para guardar el historial en localStorage
    function saveConversation() {
      localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    }
    // Función para cargar el historial desde localStorage
    function loadConversation() {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        conversationHistory = JSON.parse(savedHistory);
        conversationHistory.forEach(msg => addMessageToHistory(msg.text, msg.sender));
      }
    }
    // Cargar historial al iniciar
    window.onload = loadConversation;
    // Eventos
    chatSubmit.addEventListener('click', processInput);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') processInput();
    });
    // Reconocimiento de voz
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript = event.results[i][0].transcript.trim();
          chatInput.value = transcript;
          processInput();
        } else {
          transcript = event.results[i][0].transcript;
          interimText.textContent = `Escuchando: ${transcript}`;
        }
      }
    };
    recognition.onend = () => {
      interimText.textContent = '';
      voiceButton.textContent = '🎤';
    };
    recognition.onerror = (event) => {
      console.error("Error en el reconocimiento de voz:", event.error);
      interimText.textContent = 'Error en el reconocimiento de voz.';
      voiceButton.textContent = '🎤';
    };
    voiceButton.addEventListener('click', () => {
      if (recognition.recording) {
        recognition.stop();
        voiceButton.textContent = '🎤';
      } else {
        recognition.start();
        voiceButton.textContent = '🛑';
      }
    });