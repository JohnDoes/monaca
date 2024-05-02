import time
import re
from urllib import request
from bs4 import BeautifulSoup
from googletrans import Translator
import sys
from pydantic import BaseModel

import urllib.request



#n18_ck = ""
#k_ck = "kakuyomu"
#a_ck = ""
url = "https://kakuyomu.jp/works/16816700428600671727"
num = "1"
lnum = "1"
lng = "en"
def rtnLng(lng):

       if lng == "ja":
              lang = "ja"
              return lang
       elif lng == "en-ja":
              lang = "en"
              return lang
       elif lng == "fr-ja":
              lang = "fr"
              return lang
       elif lng == "de-ja":
              lang = "de"
              return lang
       elif lng == "ru-ja":
              lang = "ru"
              return lang
       elif lng == "zh-ja":
              lang = "zh"
              return lang
       elif lng == "kr-ja":
              lang = "kr"
              return lang
       elif lng == "ar-ja":
              lang = "ar"
              return lang
       elif lng == "it-ja":
              lang = "it"
              return lang
       elif lng == "fi-ja":
              lang = "fi"
              return lang
       elif lng == "en":
              lang = "en"
              return lang
       elif lng == "fr":
              lang = "fr"
              return lang
       elif lng == "de":
              lang = "de"
              return lang
       elif lng == "ru":
              lang = "ru"
              return lang
       elif lng == "zh":
              lang = "zh"
              return lang
       elif lng == "kr":
              lang = "kr"
              return lang
       elif lng == "ar":
              lang = "ar"
              return lang
       elif lng == "it":
              lang = "it"
              return lang
       elif lng == "fi":
              lang = "fi"
              return lang
       else:
              lang = "en"
              return lang
       
def narouload(url, num, lng, lnum):
       honbun = []
       tx = []
       language = rtnLng(lng)
       # 作品本文ページのURL
       url = url + num + "/"
       res = request.urlopen(url)
       soup = BeautifulSoup(res, "html.parser")
       pattern = re.compile("[0-9a-zA-Zぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠_]")
       ttl = soup.select_one("p.novel_subtitle").text
       jdg1 = pattern.search(ttl)
       translator = Translator()
       if jdg1:
              honbun.append(["ja", ttl])
              # enTxt = translator.translate(ttl,dest=language,src='ja').text
              # honbun.append([language, ttl])
              # time.sleep(0.5)    
       txtList = soup.select("div.novel_view > p")
       for i in txtList:
              jaTxt = i.text
              jdg1 = pattern.search(jaTxt)
              if jdg1:
                     honbun.append(["ja", jaTxt])
                     # enTxt = translator.translate(jaTxt,dest=language,src='ja').text
                     # honbun.append([language, jaTxt])
                     # time.sleep(1)
       tx.append(honbun[int(lnum)])
       enTxt = translator.translate(honbun[int(lnum)][1],dest=language,src='ja').text
       tx.append([language, enTxt])
       return tx

def kakuload(url, num, lng, lnum):
       honbun = []
       tx = []
       language = rtnLng(lng)

       #code = url.split("/")
       #ncode = code[4]  # 取得したい小説のNコードを指定
       ncode = url

       # 全部分数を取得
       info_url = url
       info_res = request.urlopen(info_url)
       soup = BeautifulSoup(info_res, "html.parser")
       # pre_info = soup.select_one(".js-vertical-composition-item").text
       # num_parts = int(re.search(r"全([0-9]+)話", pre_info).group(1))
       # オリジナル　エピソードURL取得
       epi_url = soup.select('a.WorkTocSection_link__ocg9K')
       episodeUrl = []
       translator = Translator()
       for i in range(len(epi_url)):
              episodeUrl.append(epi_url[i].get('href'))
       # 作品本文ページのURL
       url = "https://kakuyomu.jp" + episodeUrl[int(num)-1]
       res = request.urlopen(url)
       soup = BeautifulSoup(res, "html.parser")
       pattern = re.compile("[0-9a-zA-Zぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠_]")
       ttl = soup.select_one("p.widget-episodeTitle").text
       jdg1 = pattern.search(ttl)
       if jdg1:
              honbun.append(["ja", ttl])
              # enTxt = translator.translate(ttl,dest=language,src='ja').text
              # honbun.append([language, ttl])
              # time.sleep(0.5)    
       txtList = soup.select("div.widget-episodeBody > p")
       for i in txtList:
              jaTxt = i.text
              jdg1 = pattern.search(jaTxt)
              if jdg1:
                     honbun.append(["ja", jaTxt])
                     # enTxt = translator.translate(jaTxt,dest=language,src='ja').text
                     # honbun.append([language, jaTxt])
                     # time.sleep(0.5)
       tx.append(honbun[int(lnum)])
       enTxt = translator.translate(honbun[int(lnum)][1],dest=language,src='ja').text
       tx.append([language, enTxt])
       return tx

n_ck = "ncode"
urlJdg = url.find(n_ck)
if urlJdg != -1:
       text = narouload(url, num, lng, lnum)
else:
       text = kakuload(url, num, lng, lnum)

