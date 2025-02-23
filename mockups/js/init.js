import users from "../json/users.js";
import subscriptions from "../json/subscriptions.js";
import plans from "../json/plans.js";

const init = () => {
  buildHeader();
  buildSiteList();
};

function buildHeader() {
  const user = users[0];
  const status = document.querySelector(".acct-status");
  const name = document.querySelector(".acct-name");
  const id = document.querySelector(".acct-id");
  const referral_code = document.querySelector(".referral-code");
  const company = document.querySelector(".company");

  name.textContent = `${user.first_name} ${user.last_name}`;
  id.textContent = user.id;
  referral_code.textContent = user.referral_code;
  company.textContent = user.company;

  if (user.status === "active") {
    status.textContent = "ACTIVE";
    status.classList.remove("inactive");
    status.classList.add("active");
  }
}

function buildSiteList() {
  const subCount = document.querySelector(".sub-count");
  const sublist = document.querySelector(".sub-list");

  subCount.textContent = subscriptions.length;

  subscriptions.forEach((sub) => {
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    h3.textContent = `${sub.domain.toUpperCase()} — ${plans[sub.plan].name}`;
    article.append(h3);

    // Build Site Info
    const siteInfo = document.createElement("section");
    siteInfo.classList.add("site-info");

    const p1 = document.createElement("p");
    p1.textContent = `Started: `;
    const span1 = document.createElement("span");
    span1.textContent = new Date(sub.created_at).toLocaleDateString();
    p1.append(span1);

    siteInfo.append(p1);

    if (sub.autoRenew === true) {
      const p2 = document.createElement("p");
      p2.textContent = `Auto-Renew: `;
      const span2 = document.createElement("span");
      span2.textContent = new Date(sub.renewal_date).toLocaleDateString();
      p2.append(span2);

      siteInfo.append(p2);
    }

    // Build Site Addons

    const addons = document.createElement("section");
    addons.classList.add("site-addons");
    const ul = document.createElement("ul");
    const domains = sub.alt_domains;
    const addOns = sub.addOns;

    if (domains.length > 0) {
      const li = document.createElement("li");
      li.textContent = `Additional Domains: ${domains.join(", ")}`;
      ul.append(li);
    }

    if (addOns.length > 0) {
      const li = document.createElement("li");
      li.textContent = `Add-ons: ${addOns.join(", ")}`;
      ul.append(li);
    }

    addons.append(ul);

    // Populate DOM
    const div = document.createElement("div");
    div.append(siteInfo);
    div.append(addons);
    article.appendChild(div);

    sublist.prepend(article);
  });
}

export { init };
