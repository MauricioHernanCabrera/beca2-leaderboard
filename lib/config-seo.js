const configMeta = ({ description = null, title = null, safeImg = {} }) => {
  const { alt = null, url = null } = safeImg;

  const metas = [];

  if (description) {
    metas.push({
      hid: "description",
      name: "description",
      content: `${description}`
    });
    metas.push({
      hid: "twitter-description",
      name: "twitter:description",
      content: `${description}`
    });
    metas.push({
      hid: "og-description",
      property: "og:description",
      content: `${description}`
    });
  }

  if (title) {
    metas.push({
      hid: "twitter-title",
      name: "twitter:title",
      content: `${title}`
    });
    metas.push({ hid: "og-title", property: "og:title", content: `${title}` });
  }

  if (alt) {
    metas.push({
      hid: "twitter-image-alt",
      name: "twitter:image:alt",
      content: `${alt}`
    });
  }

  if (url) {
    metas.push({
      hid: "twitter-image",
      name: "twitter:image",
      content: `${url}`
    });
    metas.push({ hid: "og-image", property: "og:image", content: `${url}` });
  }

  return metas;
};

const getPath = (routeName, routePath) => {
  if (routeName.includes("-lang")) {
    const [_, ...arrayPath] = routePath.slice(1).split("/");
    return arrayPath.join("/");
  } else {
    return routePath.slice(1);
  }
};

const configAlternateLang = (langs, frontUrl, path) => {
  return [
    {
      rel: "alternate",
      href: `${frontUrl}/${path}`,
      hreflang: "en",
      hid: `lang-en`
    },
    ...langs.map(lang => ({
      rel: "alternate",
      href: `${frontUrl}/${lang}/${path}`,
      hreflang: lang,
      hid: `lang-${lang}`
    }))
  ];
};

export { configMeta, getPath, configAlternateLang };
