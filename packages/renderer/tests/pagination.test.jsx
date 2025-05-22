import { describe, expect, test } from 'vitest';

import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
} from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const styles = StyleSheet.create({
  body: {
    fontFamily: 'Arimo',
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    height: 16,
  },
  mainContent: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  titleFirstLetter: {
    textTransform: 'uppercase',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    marginLeft: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  findingsContainer: {
    backgroundColor: '#f9fafb',
    padding: 4,
    borderRadius: 12,
    border: '1px solid #e5e7eb',
  },
  finding: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    marginBottom: 4,
  },
  quoteContainer: {
    marginTop: 12,
  },
  quoteWrapper: {
    flexDirection: 'row',
  },
  quoteLine: {
    width: 4,
    backgroundColor: '#f3f4f6',
    marginRight: 10,
  },
  quoteContent: {
    flex: 1,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quoteMark: {
    backgroundColor: '#f3f4f6',
    borderRadius: 9999,
    padding: 8,
    marginRight: 10,
  },
  quoteMarkText: {
    fontSize: 14,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    flex: 1,
  },
  quoteAuthor: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    paddingLeft: 36,
  },
  standaloneQuote: {
    marginBottom: 12,
  },
  standaloneQuoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  standaloneQuoteAuthor: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  footerText: {
    fontSize: 12,
  },
});

Font.register({
  family: 'Arimo',
  src: 'https://fonts.gstatic.com/s/arimo/v9/Gpeo80g-5ji2CcyXWnzh7g.ttf',
});

Font.register({
  family: 'Arimo',
  src: 'https://fonts.gstatic.com/s/arimo/v9/_OdGbnX2-qQ96C4OjhyuPw.ttf',
  fontStyle: 'italic',
});

Font.register({
  family: 'Arimo',
  src: 'https://fonts.gstatic.com/s/arimo/v9/ZItXugREyvV9LnbY_gxAmw.ttf',
  fontWeight: 'bold',
});

const reportData = {
  title: 'Sollers volo urbanus thalassinus cedo umquam.',
  introduction:
    'Compello urbanus clamo annus neque totus vicinus crinis. Abbas inflammatio adstringo degero acer. Viscus cubo delectus.\nAssentator alii auctor molestias adulatio tenus alius. Debitis sustineo sollicito et undique. Demitto candidus decet cibus architecto ait admoneo laudantium comminor.',
  topics: [
    'Calco acidus virtus conor.',
    'Tonsor dignissimos trans cometes.',
    'Sono pax degusto odit triduana.',
    'Vis odio sapiente comitatus apparatus caterva.',
    'Consectetur clementia vitium depereo asporto substantia.',
  ],
  keyFindings: {
    insights: [
      'Canis testimonium balbus thema minus dedecor adsum tactus centum.',
      'Benevolentia voveo illum stabilis attollo culpa eius turpis spes.',
      'Alioqui adeo audacia hic suasoria.',
      'Artificiose corrumpo aurum.',
      'Caecus aestus amita curatio admitto summa suffragium torrens.',
    ],
    quotes: [
      {
        text: 'Ducimus vulgo pectus tyrannus nostrum cruciamentum. Nulla conicio vitium aggredior eligendi civitas dolore itaque conicio. Vel supra baiulus adfectus bardus suadeo arbustum denique deinde voluptatibus.',
        participant: 'Mrs. Marguerite Keeling III, 50',
      },
      {
        text: 'Artificiose verumtamen arcesso acerbitas vita amiculum cariosus. Ciminatio praesentium ipsa sint tot. Temeritas bis sequi vox vigilo timidus vulgivagus ascit tyrannus vulnero.',
        participant: 'Luz Weber, 34',
      },
      {
        text: 'Coerceo fugiat calcar. Damnatio depromo aptus uberrime cinis aequitas facere clamo. Texo cupio vociferor.',
        participant: 'Grady Kulas, 37',
      },
      {
        text: 'Urbanus quisquam utrimque ipsum universe adversus dedecor. Cervus aestus cauda certus aestas sumptus patior testimonium crinis celo. Clarus cometes comedo antiquus rerum comparo.',
        participant: 'Kara Welch, 60',
      },
      {
        text: 'Volutabrum vereor commemoro teres. Cimentarius labore volup adduco dedecor tactus tenus vespillo. Una sublime admitto audacia teres sumptus celer cedo terminatio suffragium.',
        participant: 'Bill Yundt, 68',
      },
    ],
  },
  summary: [
    'Spiritus beneficium antiquus doloribus tempore.',
    'Adhuc circumvenio veritas vomito vallum.',
    'Speciosus amor cuius vomito candidus tardus umquam coepi curto.',
    'Degenero depraedor tersus cubicularis.',
    'Caveo auctor vulpes cribro adipisci adnuo conculco cupressus vis.',
  ],
  quotes: [
    {
      text: 'Ambulo veritatis ubi perferendis amo summisse coniuratio venia cibo. Temeritas ustilo tunc amplexus adopto. Velum qui tabella abscido video tergiversatio curto cernuus coniuratio caveo.',
      participant: 'Terence Okuneva, 33',
    },
    {
      text: 'Numquam vereor amaritudo deporto decens. Synagoga victoria caelum concido copiose deserunt tubineus. Creator tenax vox casso qui decumbo termes pel.',
      participant: 'Jeannette Gutkowski, 26',
    },
    {
      text: 'Solio dolorum avarus viriliter creator cultura deporto audio. Cupiditas volva blanditiis vir conor tibi civis ultra subnecto ad. Vestigium suasoria tricesimus.',
      participant: 'Genevieve Nader, 25',
    },
    {
      text: 'Capillus administratio patior ustilo crur stabilis. Cedo ait benigne chirographum coerceo. Tui trucido animadverto chirographum ulterius voro earum cubicularis censura quia.',
      participant: 'Anne Stokes, 24',
    },
    {
      text: 'Amplexus denique canonicus antiquus desipio. Crustulum sponte aliquam adulescens vitae delicate. Colo undique bellum vaco suffragium.',
      participant: 'David Sawayn, 23',
    },
  ],
  recommendations: [
    'Antiquus utilis vitiosus video.',
    'Brevis depono maxime vulgo paulatim denego carcer.',
    'Conicio saepe tabula summisse sunt cum tero arbitro accusantium.',
    'Patior conscendo ago strues.',
    'Vulticulus auctus cuius utrum benevolentia crebro.',
    'Sumptus coma abduco summa varietas arbor.',
    'Perferendis voluntarius ullus voco tergiversatio voveo voro.',
    'Conor congregatio creo sperno derelinquo vos accusamus aetas decet trado.',
  ],
  followUpStudies: [
    {
      title: 'Strenuus tabesco tempore uterque utilis suffoco.',
      description:
        'Tonsor adicio vaco. Culpo corrumpo bibo tot voluptas conscendo conventus caste sulum asper. Astrum vulpes non canto talis.',
    },
    {
      title: 'Admitto coniecto veniam aliquid.',
      description:
        'Crinis ut curatio cognomen distinctio adficio maxime. Tres volubilis harum. Caste tibi thesaurus coniuratio sumptus vitium.',
    },
    {
      title: 'Expedita texo tardus valetudo agnitio validus tero cotidie.',
      description:
        'Appono terror aurum adhuc crur sodalitas temptatio depraedor valde cubo. Amaritudo attollo cognatus peior aveho. Voveo cruentus aedificium turba sopor stella.',
    },
    {
      title: 'Avaritia culpa rem peccatus ter thermae suadeo.',
      description:
        'Cernuus celer amita cogo tutis compello compono. Et tenus patria spes desparatus textilis quasi. Volup vere vilicus defero triumphus.',
    },
  ],
};

const Pagination = () => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View fixed style={styles.header}>
        <View style={styles.logo}>
          <Text>Acme Inc.</Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Text>

        <Text style={styles.paragraph}>{reportData.introduction}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topics</Text>
          <View style={styles.list}>
            {reportData.topics.map((topic) => (
              <Text key={topic} style={styles.listItem}>
                • {topic}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key findings</Text>
          <View style={styles.findingsContainer}>
            {reportData.keyFindings.insights.map((insight, index) => {
              const quote = reportData.keyFindings.quotes[index];
              const quoteText = quote ? quote.text : '';
              const participantName = quote ? quote.participant : null;

              return (
                <View
                  key={`finding-${insight.substring(0, 20)}`}
                  style={styles.finding}
                >
                  <Text style={styles.paragraph}>{insight}</Text>
                  {quoteText.length > 0 && (
                    <View style={styles.quoteContainer}>
                      <View style={styles.quoteWrapper}>
                        <View style={styles.quoteLine} />
                        <View style={styles.quoteContent}>
                          <View style={styles.quoteHeader}>
                            <View style={styles.quoteMark}>
                              <Text style={styles.quoteMarkText}>&ldquo;</Text>
                            </View>
                            <Text style={styles.quoteText}>{quoteText}</Text>
                          </View>
                          {participantName && (
                            <Text style={styles.quoteAuthor}>
                              — {participantName}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          {reportData.summary.map((paragraph) => (
            <Text key={paragraph.substring(0, 20)} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {reportData.quotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quotes</Text>
            {reportData.quotes.map((quote) => {
              const quoteText = quote.text;
              const participantName = quote.participant;
              return (
                <View
                  key={`quote-${quoteText.substring(0, 20)}`}
                  style={styles.standaloneQuote}
                >
                  <Text style={styles.standaloneQuoteText}>
                    &ldquo;{quoteText}&rdquo;
                  </Text>
                  {participantName && (
                    <Text style={styles.standaloneQuoteAuthor}>
                      — {participantName}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {reportData.recommendations.map((recommendation) => (
            <Text key={recommendation.substring(0, 20)} style={styles.listItem}>
              • {recommendation}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow-up studies</Text>
          {reportData.followUpStudies.map((study) => (
            <View key={study.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{study.title}</Text>
              <Text style={styles.paragraph}>{study.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Generated on: 5/22/2025, 12:35:25 PM
        </Text>
      </View>
    </Page>
  </Document>
);

describe('pagination', () => {
  test('should match snapshot', async () => {
    const result = await renderToImage(Pagination());
    expect(result).toMatchImageSnapshot();
  }, 5000);
});
