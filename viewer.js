import { h } from "vue";
import "./viewer.css";
const id = "vue3-pdf-" + Math.ceil(Math.random() * 10000000000);

export default {
  name: "PdfPreview",
  setup() {
    return {};
  },
  render() {
    return h("div", {
      id: id,
      class: "vue3-pdf",
      ref: "pdf",
    });
  },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pdfjs: undefined,
    };
  },
  watch: {
    url(val) {
      if (val) {
        this.run();
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pdfjs = require("pdfjs-dist/webpack.js");
      this.run();
    },
    run() {
      if (!this.url) {
        return;
      }
      this.$refs.pdf.innerHTML = "";
      let loadingTask = this.pdfjs.getDocument({ url: this.url });
      loadingTask.__PDFDocumentLoadingTask = true;

      loadingTask.promise.then((pdf) => {
        console.log(pdf);
        let pdfPages = pdf.numPages;
        for (let i = 1; i <= pdfPages; i++) {
          pdf.getPage(i).then((page) => {
            let pixelRatio = 3;
            let viewport = page.getViewport({ scale: 1 });
            let divPage = window.document.createElement("div");
            let loading = window.document.createElement("div");
            loading.className = "loading";
            divPage.appendChild(loading);
            let canvas = divPage.appendChild(
              window.document.createElement("canvas")
            );
            divPage.className = "page";
            this.$refs.pdf.appendChild(divPage);
            canvas.width = viewport.width * pixelRatio;
            canvas.height = viewport.height * pixelRatio;
            let renderContext = {
              canvasContext: canvas.getContext("2d"),
              viewport: viewport,
              transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
            };
            page
              .render(renderContext)
              .promise.then(() => {
                divPage.className = "page complete";
              })
              .catch(() => {});
          });
        }
      });
    },
  },
};
