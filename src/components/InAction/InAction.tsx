import React, { useEffect, useState } from 'react';
import './InAction.css';

export const InAction: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<string>('whatsapp');

  useEffect(() => {
    let timers: number[] = [];
    const clearAll = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const wait = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const show = (id: string) => {
      const e = document.getElementById(id);
      if (e) e.classList.add('show');
    };
    const hide = (id: string) => {
      const e = document.getElementById(id);
      if (e) e.classList.remove('show');
    };

    const animWA = () => {
      ['wa1', 'wa2', 'wa3', 'wa4', 'wa-m', 'wr1', 'wr2', 'wr3'].forEach(hide);
      const typing = document.getElementById('wa-typing');
      if (typing) typing.classList.remove('show');

      const body = document.getElementById('wa-body');
      if (body) body.scrollTop = 0;

      const reveal = (id: string, delay: number) => {
        wait(() => {
          show(id);
          if (body) {
            setTimeout(() => {
              body.scrollTop = body.scrollHeight;
            }, 60);
          }
        }, delay);
      };

      reveal('wa1', 400);
      reveal('wa2', 1100);
      reveal('wa3', 1800);
      reveal('wa4', 2500);

      wait(() => {
        if (typing) typing.classList.add('show');
      }, 3300);
      wait(() => {
        if (body) body.scrollTop = body.scrollHeight;
      }, 3360);

      wait(() => {
        if (typing) typing.classList.remove('show');
      }, 5100);
      reveal('wa-m', 5350);

      wait(() => show('wr1'), 6600);
      wait(() => show('wr2'), 7100);
      wait(() => show('wr3'), 7500);
    };

    const animTrello = () => {
      ['tc1', 'tc2', 'tc3', 'tc4', 'tc5'].forEach(hide);
      const bar = document.getElementById('t-sync');
      const fill = document.getElementById('t-fill');
      if (bar) bar.classList.remove('show');
      if (fill) fill.style.width = '0%';

      wait(() => {
        if (bar) bar.classList.add('show');
        setTimeout(() => {
          if (fill) fill.style.width = '100%';
        }, 60);
      }, 500);

      ['tc1', 'tc2', 'tc3', 'tc4', 'tc5'].forEach((id, i) => {
        wait(() => show(id), 2400 + i * 340);
      });
    };

    const animZoho = () => {
      const alert = document.getElementById('z-alert');
      const draft = document.getElementById('z-draft');
      const sent = document.getElementById('z-sent');
      if (alert) alert.classList.remove('show');
      if (draft) draft.classList.remove('show');
      if (sent) sent.classList.remove('show');

      const btnReview = document.getElementById('z-review');
      if (btnReview) {
        btnReview.onclick = () => {
          if (alert) alert.classList.remove('show');
          setTimeout(() => {
            if (draft) draft.classList.add('show');
          }, 260);
        };
      }
      
      const btnDismiss = document.getElementById('z-dismiss');
      if (btnDismiss) {
        btnDismiss.onclick = () => {
          if (alert) alert.classList.remove('show');
        };
      }
      
      const btnSend = document.getElementById('z-send');
      if (btnSend) {
        btnSend.onclick = () => {
          if (sent) sent.classList.add('show');
        };
      }

      wait(() => {
        if (alert) alert.classList.add('show');
      }, 1600);
    };

    const animExcel = () => {
      const banner = document.getElementById('x-banner');
      const sum = document.getElementById('x-sum');
      const thread = document.getElementById('x-thread');
      ['xs1', 'xs2', 'xs3', 'xs-flag'].forEach(hide);
      if (banner) banner.classList.remove('show');
      if (sum) sum.classList.remove('show');
      if (thread) thread.classList.remove('hide');

      const btnView = document.getElementById('x-view');
      if (btnView) {
        btnView.onclick = () => {
          if (thread) thread.classList.add('hide');
          setTimeout(() => {
            if (sum) sum.classList.add('show');
            ['xs1', 'xs2', 'xs3'].forEach((id, i) => {
              setTimeout(() => show(id), 160 + i * 190);
            });
            setTimeout(() => show('xs-flag'), 820);
          }, 340);
        };
      }

      wait(() => {
        if (banner) banner.classList.add('show');
      }, 2000);
    };

    const animEmail = () => {
      const notif = document.getElementById('e-notif');
      const draft = document.getElementById('e-draft');
      const sent = document.getElementById('e-sent');
      if (notif) notif.classList.remove('show');
      if (draft) draft.classList.remove('show');
      if (sent) sent.classList.remove('show');

      const btnReview = document.getElementById('e-review');
      if (btnReview) {
        btnReview.onclick = () => {
          if (draft) draft.classList.add('show');
        };
      }
      
      const btnSend = document.getElementById('e-send');
      if (btnSend) {
        btnSend.onclick = () => {
          if (sent) sent.classList.add('show');
        };
      }

      wait(() => {
        if (notif) notif.classList.add('show');
      }, 900);
      wait(() => {
        if (draft) draft.classList.add('show');
      }, 2200);
    };

    const animMeta = () => {
      const notif = document.getElementById('m-notif');
      const paused = document.getElementById('m-paused');
      const status = document.getElementById('m-status');
      if (notif) notif.classList.remove('show');
      if (paused) paused.classList.remove('show');
      if (status) {
        status.classList.remove('paused');
        status.textContent = 'Active';
      }

      const btnPause = document.getElementById('m-pause');
      if (btnPause) {
        btnPause.onclick = () => {
          if (notif) notif.classList.remove('show');
          setTimeout(() => {
            if (status) {
              status.classList.add('paused');
              status.textContent = 'Paused';
            }
            if (paused) paused.classList.add('show');
          }, 260);
        };
      }

      wait(() => {
        if (notif) notif.classList.add('show');
      }, 1500);
    };

    clearAll();

    const outEls = document.querySelectorAll('.scene.out');
    outEls.forEach((el) => {
      el.classList.remove('out');
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (currentScene === 'whatsapp') animWA();
        else if (currentScene === 'trello') animTrello();
        else if (currentScene === 'zoho') animZoho();
        else if (currentScene === 'excel') animExcel();
        else if (currentScene === 'email') animEmail();
        else if (currentScene === 'meta') animMeta();
      });
    });

    return () => clearAll();
  }, [currentScene]);

  const handleTabClick = (sceneName: string) => {
    if (sceneName === currentScene) return;
    
    setCurrentScene(sceneName);
  };

  return (
    <div className="w-full">
      {/* ══ TAB BAR ══ */}
      <nav className="tabs" role="tablist">
        <button className={`tab ${currentScene === 'whatsapp' ? 'on' : ''}`} onClick={() => handleTabClick('whatsapp')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.11 1.523 5.836L0 24l6.336-1.497A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.371l-.356-.213-3.742.883.953-3.65-.233-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          WhatsApp
        </button>
        <button className={`tab ${currentScene === 'trello' ? 'on' : ''}`} onClick={() => handleTabClick('trello')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-7.44c0 .795-.645 1.44-1.44 1.44H15c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v6.18z"/></svg>
          Trello
        </button>
        <button className={`tab ${currentScene === 'zoho' ? 'on' : ''}`} onClick={() => handleTabClick('zoho')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-.5-13h1v6l5.25 3.15-.75 1.23L11.5 14V7z"/></svg>
          Zoho CRM
        </button>
        <button className={`tab ${currentScene === 'excel' ? 'on' : ''}`} onClick={() => handleTabClick('excel')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zm-9-4h2v2H9zm0-3h6v2H9zm0-3h6v2H9z"/></svg>
          Excel
        </button>
        <button className={`tab ${currentScene === 'email' ? 'on' : ''}`} onClick={() => handleTabClick('email')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          Email
        </button>
        <button className={`tab ${currentScene === 'meta' ? 'on' : ''}`} onClick={() => handleTabClick('meta')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Meta Ads
        </button>
      </nav>

      {/* ══ STAGE ══ */}
      <div className="stage text-left">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             1. WHATSAPP
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className={`scene ${currentScene === 'whatsapp' ? 'on' : ''}`} id="scene-whatsapp">
          <div className="phone">
            <div className="phone-notch"><div className="phone-pill"></div></div>

            <div className="wa-hd">
              <span className="wa-back">&#8249;</span>
              <div className="wa-av">BG</div>
              <div>
                <div className="wa-info-name">Belmont Group &#8212; Harborfield</div>
                <div className="wa-info-sub">Priya, Donavon, Sandra +2</div>
              </div>
            </div>

            <div className="wa-body" id="wa-body">
              <div className="wa-date">Today</div>

              <div className="wa-row in" id="wa1">
                <div className="wa-sender" style={{ color: '#53bdeb' }}>Priya</div>
                <div className="wa-bub">Anyone have the Q3 numbers for Harborfield before Thursday?</div>
                <div className="wa-ts">08:47</div>
              </div>

              <div className="wa-row out" id="wa2">
                <div className="wa-bub">I thought Sandra was pulling those?</div>
                <div className="wa-ts">08:48</div>
              </div>

              <div className="wa-row in" id="wa3">
                <div className="wa-sender" style={{ color: '#e2a96e' }}>Sandra</div>
                <div className="wa-bub">Nobody told me. What format do you need?</div>
                <div className="wa-ts">08:48</div>
              </div>

              <div className="wa-row in" id="wa4">
                <div className="wa-sender" style={{ color: '#53bdeb' }}>Priya</div>
                <div className="wa-bub">Also &#8212; who&#8217;s presenting?</div>
                <div className="wa-ts">08:49</div>
              </div>

              {/* Typing indicator */}
              <div className="wa-typing" id="wa-typing">
                <div className="m-badge">
                  <div className="m-av">M</div>
                  <span className="m-name">MERIDIAN</span>
                </div>
                <div className="wa-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>

              {/* Meridian reply */}
              <div className="wa-row bot" id="wa-m">
                <div className="m-badge">
                  <div className="m-av">M</div>
                  <span className="m-name">MERIDIAN</span>
                  <svg className="m-tick" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1"/>
                    <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="wa-bub">
                  Here&#8217;s where Thursday stands.
                  <div className="m-divider"></div>
                  <div className="m-task"><div className="m-dot"></div><span>Q3 numbers syncing from Xero &#8212; Sandra, summary to Trello by EOD</span></div>
                  <div className="m-task"><div className="m-dot"></div><span>Presenter order: Marcus opens &#183; Priya retail &#183; Donavon logistics</span></div>
                  <div className="m-task"><div className="m-dot"></div><span>Tasks created and assigned in Trello. Board updated.</span></div>
                  <div className="m-divider"></div>
                  <div className="m-foot">You&#8217;re clear to focus.</div>
                </div>
                <div className="wa-rxs">
                  <div className="wa-rx" id="wr1">&#128077; <span>Priya</span></div>
                  <div className="wa-rx" id="wr2">&#128077; <span>Donavon</span></div>
                  <div className="wa-rx" id="wr3">&#128077; <span>Sandra</span></div>
                </div>
                <div className="wa-ts">08:49</div>
              </div>
            </div>
          </div>
          <div className="scene-cap">
            <h3>WhatsApp &#8212; Team Intelligence</h3>
            <p>Meridian reads the thread, resolves the confusion, builds the tasks. Without being asked.</p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             2. TRELLO
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className={`scene ${currentScene === 'trello' ? 'on' : ''}`} id="scene-trello">
          <div className="browser">
            <div className="b-bar">
              <div className="b-dots"><div className="b-dot"></div><div className="b-dot"></div><div className="b-dot"></div></div>
              <div className="b-url">trello.com/b/belmont-group-weekly-ops</div>
            </div>
            <div className="trello-body">
              <div className="trello-top">
                <span className="trello-name">Belmont Group &#8212; Weekly Ops</span>
                <span className="trello-badge">Monday, 7:58am</span>
              </div>
              <div className="trello-sync" id="t-sync">
                <span>&#10022;&nbsp; Meridian syncing last week&#8217;s activity&#8230;</span>
                <div className="sync-track"><div className="sync-fill" id="t-fill"></div></div>
              </div>
              <div className="trello-cols">
                <div className="tcol">
                  <div className="tcol-head">To Do</div>
                  <div className="tcard" id="tc1">
                    <div className="tcard-lbl" style={{ background: '#c4a03c' }}></div>
                    <div className="tcard-title">Harborfield Prep &#8212; Deck &amp; Q3 Summary</div>
                    <div className="tcard-foot">
                      <div className="tcard-av" style={{ background: '#1e4d6b' }}>PN</div>
                      <div className="tcard-meta">Due Thu 20 Mar</div>
                    </div>
                    <div className="m-tag">&#10022; Meridian Generated</div>
                  </div>
                  <div className="tcard" id="tc2">
                    <div className="tcard-lbl" style={{ background: '#2d6a4f' }}></div>
                    <div className="tcard-title">Q4 Retail Forecast &#8212; Sandra draft</div>
                    <div className="tcard-foot">
                      <div className="tcard-av" style={{ background: '#2d6a4f' }}>SL</div>
                      <div className="tcard-meta">Due Fri 21 Mar</div>
                    </div>
                    <div className="m-tag">&#10022; Meridian Generated</div>
                  </div>
                  <div className="tcard" id="tc3">
                    <div className="tcard-lbl" style={{ background: '#6b2d2d' }}></div>
                    <div className="tcard-title">Kevin Mooroogen &#8212; HR flag, follow up privately</div>
                    <div className="tcard-foot">
                      <div className="tcard-av" style={{ background: '#1a1a2e' }}>MK</div>
                      <div className="tcard-meta">This week</div>
                    </div>
                    <div className="m-tag">&#10022; Meridian Generated</div>
                  </div>
                </div>
                <div className="tcol">
                  <div className="tcol-head">In Progress</div>
                  <div className="tcard" id="tc4">
                    <div className="tcard-lbl" style={{ background: '#1e4d8c' }}></div>
                    <div className="tcard-title">Logistics Contract &#8212; Two deliveries delayed</div>
                    <div className="tcard-foot">
                      <div className="tcard-av" style={{ background: '#1e4d8c' }}>DA</div>
                      <div className="tcard-meta">Overdue &#183; 2 days</div>
                    </div>
                    <div className="m-tag">&#10022; Meridian Generated</div>
                  </div>
                  <div className="tcard" id="tc5">
                    <div className="tcard-lbl" style={{ background: '#c4a03c' }}></div>
                    <div className="tcard-title">Xero Q3 export &#8212; Reza to review totals</div>
                    <div className="tcard-foot">
                      <div className="tcard-av" style={{ background: '#3d2a1e' }}>RM</div>
                      <div className="tcard-meta">Today</div>
                    </div>
                    <div className="m-tag">&#10022; Meridian Generated</div>
                  </div>
                </div>
                <div className="tcol">
                  <div className="tcol-head">Done</div>
                  <div className="tcard" style={{ opacity: 0.28 }}>
                    <div className="tcard-lbl" style={{ background: '#2d2d2d' }}></div>
                    <div className="tcard-title">Weekly standup &#8212; notes archived</div>
                    <div className="tcard-foot"><div className="tcard-meta">Mon 10 Mar</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scene-cap">
            <h3>Trello &#8212; Autonomous Task Management</h3>
            <p>Monday morning. Meridian read last week, built the board, assigned the work.</p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             3. ZOHO
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className={`scene ${currentScene === 'zoho' ? 'on' : ''}`} id="scene-zoho">
          <div className="browser">
            <div className="b-bar">
              <div className="b-dots"><div className="b-dot"></div><div className="b-dot"></div><div className="b-dot"></div></div>
              <div className="b-url">crm.zoho.com/belmont/deals/pipeline</div>
            </div>
            <div className="zoho-body">
              <div className="zoho-top">
                <span className="zoho-logo">ZOHO</span>
                <div className="zoho-nav">
                  <span className="zoho-ni">Leads</span>
                  <span className="zoho-ni on">Deals</span>
                  <span className="zoho-ni">Contacts</span>
                </div>
              </div>
              <div className="zoho-content">
                <div className="zoho-ch">
                  <div className="zoho-ct">Open Deals &#8212; Belmont Group</div>
                  <div className="zoho-flt">This Quarter</div>
                </div>
                <div className="zoho-deals">
                  <div className="zdeal">
                    <div className="zdeal-dot" style={{ background: '#3ecf6a' }}></div>
                    <div className="zdeal-info">
                      <div className="zdeal-name">Coastal Logistics &#8212; Bulk Contract</div>
                      <div className="zdeal-meta">Negotiation &#183; Last activity 2 days ago</div>
                    </div>
                    <div className="zdeal-r">
                      <div className="zdeal-val">R180K</div>
                      <div className="zdeal-tag ok">Active</div>
                    </div>
                  </div>
                  <div className="zdeal flag">
                    <div className="zdeal-dot" style={{ background: '#e09a3a' }}></div>
                    <div className="zdeal-info">
                      <div className="zdeal-name">Harborfield Retail &#8212; SKU Expansion</div>
                      <div className="zdeal-meta">Proposal Sent &#183; Last activity <strong>18 days ago</strong></div>
                    </div>
                    <div className="zdeal-r">
                      <div className="zdeal-val">R340K</div>
                      <div className="zdeal-tag bad">Gone quiet</div>
                    </div>
                  </div>
                  <div className="zdeal">
                    <div className="zdeal-dot" style={{ background: '#5b8db8' }}></div>
                    <div className="zdeal-info">
                      <div className="zdeal-name">Fabrication &#8212; Equipment Supply</div>
                      <div className="zdeal-meta">Qualified &#183; Last activity 5 days ago</div>
                    </div>
                    <div className="zdeal-r">
                      <div className="zdeal-val">R95K</div>
                      <div className="zdeal-tag ok">Active</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="z-alert" id="z-alert">
                <div className="z-ah">
                  <div className="z-aicon">M</div>
                  <div>
                    <div className="z-atitle">&#10022; Meridian &#8212; Deal at Risk</div>
                    <div className="z-asub">Harborfield Retail &#183; R340K &#183; 18 days silent</div>
                  </div>
                </div>
                <div className="z-abody">
                  <strong>Proposal sent 18 days ago &#8212; no response.</strong> Last touchpoint: James Roux confirmed budget on 14 Nov. <span className="g">72% close probability</span> if you follow up within 3 days. Draft ready.
                </div>
                <div className="z-acts">
                  <button className="z-btn p" id="z-review">Review Draft</button>
                  <button className="z-btn" id="z-dismiss">Dismiss</button>
                  <span className="z-ts">Detected 7 min ago</span>
                </div>
              </div>

              <div className="z-draft" id="z-draft">
                <div className="z-dey">&#10022; Meridian Draft &#8212; Ready to Send</div>
                <div className="z-dtitle">Re: Harborfield &#8212; SKU Expansion Proposal</div>
                <div className="z-dfield"><div className="z-dlbl">To</div><div className="z-dval">James Roux &#8212; Harborfield Retail</div></div>
                <div className="z-dfield"><div className="z-dlbl">Subject</div><div className="z-dval">Re: Harborfield &#8212; SKU Expansion Proposal</div></div>
                <div className="z-dbody">
                  <p>Hi James,</p>
                  <p>Wanted to follow up on the proposal from a couple of weeks ago. Q4 planning is in motion and I&#8217;d like us to be aligned before it locks.</p>
                  <p>Happy to jump on a 20-minute call this week. &#8212; Marcus</p>
                </div>
                <div className="z-dfoot">
                  <button className="z-send" id="z-send">Send</button>
                  <span className="z-fnote">Meridian drafted this &#183; Edit freely</span>
                </div>
                <div className="z-confirm" id="z-sent">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Follow-up sent &#8212; deal re-engaged
                </div>
              </div>
            </div>
          </div>
          <div className="scene-cap">
            <h3>Zoho CRM &#8212; Deals That Don&#8217;t Die Quietly</h3>
            <p>R340K proposal. 18 days of silence. Meridian caught it, drafted the follow-up. One click to send.</p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             4. EXCEL
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className={`scene ${currentScene === 'excel' ? 'on' : ''}`} id="scene-excel">
          <div className="browser">
            <div className="b-bar">
              <div className="b-dots"><div className="b-dot"></div><div className="b-dot"></div><div className="b-dot"></div></div>
              <div className="b-url">mail.google.com/mail</div>
            </div>
            <div className="xls-scene">
              <div className="xls-sb">
                <div className="xls-sbl">GMAIL</div>
                <div className="xls-ni on">Inbox</div>
                <div className="xls-ni">Sent</div>
                <div className="xls-ni">Drafts</div>
              </div>
              <div className="xls-main">
                <div className="xls-thread" id="x-thread">
                  <div className="xls-th">
                    <div className="xls-sub">Revenue summary &#8212; Q3 all divisions (raw)</div>
                    <div className="xls-from">From <strong>Reza Mootoosamy</strong> &#183; Today 7:31am</div>
                  </div>
                  <div className="xls-tb">
                    <p>Marcus, attaching the Q3 numbers across all three divisions. Still working through logistics &#8212; Tab 2 has the adjustments. Let me know if you need anything before the board meeting.</p>
                    <p>Reza</p>
                  </div>
                  <div className="xls-att">
                    <div className="xls-att-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                    </div>
                    <div>
                      <div className="xls-att-name">Q3_Revenue_Reza_FINAL_v3.xlsx</div>
                      <div className="xls-att-meta">3 tabs &#183; 847 KB</div>
                    </div>
                    <div className="xls-att-open">Open</div>
                  </div>
                  <div className="xls-banner" id="x-banner">
                    <div className="xls-bi">M</div>
                    <div className="xls-bt">&#10022; Meridian processed this file. <span>No need to open it.</span></div>
                    <button className="xls-bb" id="x-view">View Summary</button>
                  </div>
                </div>

                <div className="xls-sum" id="x-sum">
                  <div className="xls-sh">
                    <div>
                      <div className="xls-sey">&#10022; Meridian &#8212; Processed from Reza&#8217;s attachment</div>
                      <div className="xls-stitle">Q3 Revenue &#8212; All Divisions</div>
                      <div className="xls-ssrc">Q3_Revenue_Reza_FINAL_v3.xlsx &#183; Processed 07:32am</div>
                    </div>
                    <div className="xls-stime">07:32 AM</div>
                  </div>
                  <div className="xls-stats">
                    <div className="xls-stat" id="xs1">
                      <div className="xls-sdiv">Retail</div>
                      <div className="xls-sval">R4.2M</div>
                      <div className="xls-delta up">
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="currentColor"><path d="M5 1l4 8H1z"/></svg>
                        +12% vs Q2
                      </div>
                    </div>
                    <div className="xls-stat" id="xs2">
                      <div className="xls-sdiv">Logistics</div>
                      <div className="xls-sval">R2.8M</div>
                      <div className="xls-delta dn">
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="currentColor"><path d="M5 9L1 1h8z"/></svg>
                        &#8722;4% vs Q2
                      </div>
                    </div>
                    <div className="xls-stat" id="xs3">
                      <div className="xls-sdiv">Fabrication</div>
                      <div className="xls-sval">R3.1M</div>
                      <div className="xls-delta fl">&#8594;&nbsp;Flat</div>
                    </div>
                  </div>
                  <div className="xls-flag" id="xs-flag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <div className="xls-ftext"><strong>Logistics flag:</strong> Q3 dip driven by two delayed contracts. Donavon&#8217;s update due Friday &#8212; review before board.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scene-cap">
            <h3>Excel &#8212; The File That Didn&#8217;t Need Opening</h3>
            <p>Reza sends the attachment. Meridian processes it. Marcus never opens the file.</p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             5. EMAIL
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className={`scene ${currentScene === 'email' ? 'on' : ''}`} id="scene-email">
          <div className="browser">
            <div className="b-bar">
              <div className="b-dots"><div className="b-dot"></div><div className="b-dot"></div><div className="b-dot"></div></div>
              <div className="b-url">mail.google.com/mail</div>
            </div>
            <div className="gmail-scene">
              <div className="gmail-sb">
                <div className="gmail-compose">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                  Compose
                </div>
                <div className="gmail-ni on">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  Inbox
                </div>
                <div className="gmail-ni">Sent</div>
                <div className="gmail-ni">Drafts <span style={{ color: 'var(--gold)', fontSize: '9.5px', marginLeft: '3px' }}>1</span></div>
              </div>
              <div className="gmail-main">
                <div className="gmail-notif" id="e-notif">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                  <span>&#10022;&nbsp; Sandra Lim meeting ended &#8212; follow-up draft ready</span>
                  <button className="gmail-nbtn" id="e-review">Review</button>
                </div>
                <div className="gmail-list">
                  <div className="gmail-row unread">
                    <div className="gmail-from">Reza Mootoosamy</div>
                    <div className="gmail-subj">Revenue summary &#8212; Q3 all divisions (raw)</div>
                    <div className="gmail-time">7:31am</div>
                  </div>
                  <div className="gmail-row">
                    <div className="gmail-from">Priya Naidoo</div>
                    <div className="gmail-subj">Harborfield prep &#8212; do we have the deck?</div>
                    <div className="gmail-time">9:14am</div>
                  </div>
                  <div className="gmail-row">
                    <div className="gmail-from">James Roux</div>
                    <div className="gmail-subj">Re: Strategic Review &#8212; confirming 9am Thu</div>
                    <div className="gmail-time">10:02am</div>
                  </div>
                  <div className="gmail-row">
                    <div className="gmail-from">Donavon Ah-Koon</div>
                    <div className="gmail-subj">Logistics update &#8212; two contracts delayed</div>
                    <div className="gmail-time">2:18pm</div>
                  </div>
                </div>
                <div className="gmail-draft" id="e-draft">
                  <div className="dh">
                    <div className="dh-title">Fabrication Q4 Review &#8212; Next Steps</div>
                    <div className="dh-note">Meridian generated &#183; 3:47pm</div>
                  </div>
                  <div className="df"><div className="df-lbl">To</div><div className="df-val">Sandra Lim &#8212; Belmont Fabrication</div></div>
                  <div className="df"><div className="df-lbl">Subject</div><div className="df-val">Fabrication Q4 Review &#8212; Next Steps</div></div>
                  <div className="dbody">
                    <p>Hi Sandra, useful session today. Here&#8217;s what we agreed:</p>
                    <div className="dact-lbl">ACTIONS</div>
                    <div className="dact"><div className="dact-dot">&#8212;</div><span>Q4 capacity plan: <strong>Sandra to share draft by 21 March</strong></span></div>
                    <div className="dact"><div className="dact-dot">&#8212;</div><span>Supplier review: <strong>Marcus to approve shortlist by 28 March</strong></span></div>
                    <div className="dact"><div className="dact-dot">&#8212;</div><span>Kevin Mooroogen headcount flag: <strong>HR to follow up privately</strong></span></div>
                    <p style={{ marginTop: '5px' }}>Let&#8217;s reconnect on the 28th. Marcus</p>
                  </div>
                  <div className="dfoot">
                    <button className="dsend" id="e-send">Send</button>
                    <span className="dfnote">4 seconds to review</span>
                  </div>
                  <div className="dsent" id="e-sent">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Sent to Sandra Lim
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scene-cap">
            <h3>Email &#8212; Every Meeting, Already Followed Up</h3>
            <p>Meeting ends at 3:47pm. Draft is waiting. Marcus changes one word and sends.</p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             6. META ADS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className={`scene ${currentScene === 'meta' ? 'on' : ''}`} id="scene-meta">
          <div className="browser">
            <div className="b-bar">
              <div className="b-dots"><div className="b-dot"></div><div className="b-dot"></div><div className="b-dot"></div></div>
              <div className="b-url">business.facebook.com/adsmanager/belmont-retail</div>
            </div>
            <div className="meta-body">
              <div className="meta-nav">
                <span className="meta-logo">Meta</span>
                <span className="meta-ni">Campaigns</span>
                <span className="meta-ni on">Ad Sets</span>
                <span className="meta-ni">Ads</span>
              </div>
              <div className="meta-content">
                <div className="meta-cr">
                  <div className="meta-cn">Belmont Retail &#8212; Summer Range</div>
                  <div className="meta-st" id="m-status">Active</div>
                </div>
                <div className="meta-metrics">
                  <div className="meta-metric">
                    <div className="meta-ml">ROAS</div>
                    <div className="meta-mv danger">1.2x</div>
                    <div className="meta-mc">Was 3.4x two days ago</div>
                  </div>
                  <div className="meta-metric">
                    <div className="meta-ml">CTR</div>
                    <div className="meta-mv danger">0.4%</div>
                    <div className="meta-mc">&#8595; 41% overnight</div>
                  </div>
                  <div className="meta-metric">
                    <div className="meta-ml">Budget Today</div>
                    <div className="meta-mv">R12,400</div>
                    <div className="meta-mc">In flight</div>
                  </div>
                </div>
                <div className="meta-chart">
                  <div className="meta-cl">ROAS &#8212; Last 7 Days</div>
                  <svg className="chart-svg" viewBox="0 0 600 78" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c4a03c" stopOpacity=".25"/>
                        <stop offset="100%" stopColor="#c4a03c" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,18 C80,15 160,11 240,10 C320,9 370,11 415,13 C445,14 460,13 478,44 C494,62 524,70 565,72 L565,78 L0,78 Z" fill="url(#cg)"/>
                    <path d="M0,18 C80,15 160,11 240,10 C320,9 370,11 415,13 C445,14 460,13 478,44 C494,62 524,70 565,72" fill="none" stroke="#c4a03c" strokeWidth="1.6" opacity=".82"/>
                    <line x1="478" y1="0" x2="478" y2="78" stroke="rgba(224,82,82,.25)" strokeWidth="1" strokeDasharray="3,3"/>
                    <circle cx="478" cy="44" r="3.5" fill="#e05252"/>
                  </svg>
                </div>
              </div>
              <div className="meta-notif" id="m-notif">
                <div className="meta-ni2">M</div>
                <div className="meta-nb">
                  <div className="meta-ntitle">&#10022; Meridian &#8212; Performance Alert</div>
                  <div className="meta-ndesc">Retail ROAS dropped 65% since Tuesday. Creative fatigue on Ad Set 3. R12,400 at risk today.</div>
                  <div className="meta-nacts">
                    <button className="mn-btn">Review</button>
                    <button className="mn-btn p" id="m-pause">Pause Ad Set 3</button>
                  </div>
                </div>
              </div>
              <div className="meta-paused" id="m-paused">
                <div className="meta-pring">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4a03c" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="meta-ptitle">Ad Set 3 &#8212; Paused</div>
                <div className="meta-pdetail">Belmont Retail &#8212; Summer Range</div>
                <div className="meta-pbudget">R12,400 in budget protected</div>
                <div className="meta-pnote">Meridian will notify you when performance recovers</div>
              </div>
            </div>
          </div>
          <div className="scene-cap">
            <h3>Meta Ads &#8212; Watching What You Can&#8217;t</h3>
            <p>Marcus never opened Ads Manager. Meridian caught the drop, paused the spend. R12,400 protected.</p>
          </div>
        </div>

      </div>{/* /stage */}
    </div>
  );
};
