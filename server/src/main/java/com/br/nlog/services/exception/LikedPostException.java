package com.br.nlog.services.exception;

public class LikedPostException  extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public LikedPostException(String msg) {
		super(msg);
	}
}
