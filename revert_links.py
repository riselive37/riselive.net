import os
import re

dir_path = '.'

def revert_links(content):
    content = re.sub(r'href="index\.html"', 'href="./"', content)
    content = re.sub(r'href="about/index\.html"', 'href="about/"', content)
    content = re.sub(r'href="works/index\.html"', 'href="works/"', content)
    content = re.sub(r'href="pricing/index\.html"', 'href="pricing/"', content)
    content = re.sub(r'href="news/index\.html"', 'href="news/"', content)
    content = re.sub(r'href="contact/index\.html"', 'href="contact/"', content)
    
    content = re.sub(r'href="\.\./index\.html"', 'href="../"', content)
    content = re.sub(r'href="\.\./about/index\.html"', 'href="../about/"', content)
    content = re.sub(r'href="\.\./works/index\.html"', 'href="../works/"', content)
    content = re.sub(r'href="\.\./pricing/index\.html"', 'href="../pricing/"', content)
    content = re.sub(r'href="\.\./news/index\.html"', 'href="../news/"', content)
    content = re.sub(r'href="\.\./contact/index\.html"', 'href="../contact/"', content)
    return content

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = revert_links(content)
            if new_content != content:
                print(f"Reverted {filepath}")
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
