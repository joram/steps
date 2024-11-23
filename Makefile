run:
	cd api; sudo uvicorn main:app --host 0.0.0.0 --reload --port 5000

run_remote:
	ssh -t ubuntu@steps "cd /home/ubuntu/steps; make run"

run_local:
	cd api; uvicorn main:app --host 0.0.0.0 --reload --port 5000

deploy:
	git add .
	git commit -m "deploy"
	git push origin main
	ssh ubuntu@steps -t "cd /home/ubuntu/steps; git pull origin main"

ssh:
	ssh ubuntu@steps

stop:
	ssh ubuntu@steps -t "pkill -f uvicorn"

setup_cloudflared:
	# NOTE: do not run this command while using the DNS to ssh in. (without screen)
	sudo apt install -y curl lsb-release
	curl -L https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-archive-keyring.gpg >/dev/null
	echo "deb [signed-by=/usr/share/keyrings/cloudflare-archive-keyring.gpg] https://pkg.cloudflare.com/cloudflared bookworm main" | sudo tee  /etc/apt/sources.list.d/cloudflared.list
	sudo apt update
	sudo apt install -y cloudflared
	sudo sysctl -w net.core.rmem_max=2500000
	sudo sysctl -w net.core.wmem_max=2500000